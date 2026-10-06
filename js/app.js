// Wires the page up: reads the controls, generates a story, renders it.
// Current settings live in the URL hash so a story can be shared as a link.

const state = {
  leagueId: 'eng1',
  difficulty: 1,
  seasons: 3,
  teamSeed: newSeed(),
  storySeed: newSeed(),
};

const $ = (id) => document.getElementById(id);
const TIER_LABELS = { 1: 'Elite club', 2: 'Established club', 3: 'Underdog' };

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

function readHash() {
  const [leagueId, difficulty, seasons, teamSeed, storySeed] = location.hash.slice(1).split('.');
  if (!storySeed) return;
  if (leagueId === 'any' || LEAGUES.some((l) => l.id === leagueId)) state.leagueId = leagueId;
  if (['0', '1', '2'].includes(difficulty)) state.difficulty = Number(difficulty);
  if (['1', '3', '5'].includes(seasons)) state.seasons = Number(seasons);
  state.teamSeed = teamSeed;
  state.storySeed = storySeed;
}

function writeHash() {
  const { leagueId, difficulty, seasons, teamSeed, storySeed } = state;
  history.replaceState(null, '', `#${leagueId}.${difficulty}.${seasons}.${teamSeed}.${storySeed}`);
}

function render() {
  writeHash();
  const story = generateStory(state);

  $('story').innerHTML = `
    <header class="story-head">
      <p class="eyebrow">${escapeHtml(story.league)} · ${escapeHtml(story.country)} · ${TIER_LABELS[story.tier]}</p>
      <h2>${escapeHtml(story.team)}</h2>
      <p class="archetype">${escapeHtml(story.title)}</p>
    </header>

    <p class="premise">${escapeHtml(story.premise)}</p>

    <dl class="facts">
      <div><dt>Manager</dt><dd>${escapeHtml(story.manager.name)}</dd></div>
      <div><dt>Style</dt><dd>${escapeHtml(story.manager.style)}</dd></div>
      <div><dt>Formation</dt><dd>${escapeHtml(story.manager.formation)}</dd></div>
      <div><dt>Derby rival</dt><dd>${escapeHtml(story.derbyRival)}</dd></div>
      <div><dt>League rival</dt><dd>${escapeHtml(story.leagueRival)}</dd></div>
    </dl>

    <section>
      <h3>Save rules <span class="badge">${story.difficulty}</span></h3>
      <ul class="rules">${story.rules.map((r) => `<li>${escapeHtml(r)}</li>`).join('')}</ul>
    </section>

    <section>
      <h3>The road ahead</h3>
      <ol class="timeline">
        ${story.seasons
          .map(
            (s) => `
          <li>
            <span class="season">Season ${s.number}</span>
            <p><strong>Objective:</strong> ${escapeHtml(s.objective)}</p>
            <p class="twist"><strong>Twist:</strong> ${escapeHtml(s.twist)}</p>
          </li>`
          )
          .join('')}
      </ol>
    </section>

    <section class="finale">
      <h3>Legacy goal</h3>
      <p>${escapeHtml(story.finale)}</p>
    </section>
  `;

  $('story').dataset.text = storyToText(story);
}

function syncControls() {
  $('league').value = state.leagueId;
  $('difficulty').value = String(state.difficulty);
  $('seasons').value = String(state.seasons);
}

async function copy(text, button) {
  const original = button.textContent;
  try {
    await navigator.clipboard.writeText(text);
    button.textContent = 'Copied!';
  } catch {
    button.textContent = 'Copy failed';
  }
  setTimeout(() => (button.textContent = original), 1500);
}

function init() {
  $('league').innerHTML =
    '<option value="any">Any league (surprise me)</option>' +
    LEAGUES.map((l) => `<option value="${l.id}">${l.name} (${l.country})</option>`).join('');

  readHash();
  syncControls();

  $('league').addEventListener('change', (e) => {
    state.leagueId = e.target.value;
    state.teamSeed = newSeed();
    render();
  });
  $('difficulty').addEventListener('change', (e) => {
    state.difficulty = Number(e.target.value);
    render();
  });
  $('seasons').addEventListener('change', (e) => {
    state.seasons = Number(e.target.value);
    render();
  });

  $('generate').addEventListener('click', () => {
    state.teamSeed = newSeed();
    state.storySeed = newSeed();
    render();
  });
  $('new-story').addEventListener('click', () => {
    state.storySeed = newSeed();
    render();
  });
  $('copy-text').addEventListener('click', (e) => copy($('story').dataset.text, e.target));
  $('copy-link').addEventListener('click', (e) => copy(location.href, e.target));

  // A shared link pasted into an already-open tab only changes the hash.
  window.addEventListener('hashchange', () => {
    readHash();
    syncControls();
    render();
  });

  render();
}

init();
