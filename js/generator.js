// Turns a league choice + seeds into a full storyline.
// Seeds make every story reproducible: the same seeds always give the same story,
// which is what lets you share a story with a link.

const DIFFICULTIES = [
  { id: 0, name: 'Casual', ruleCount: 1 },
  { id: 1, name: 'Standard', ruleCount: 2 },
  { id: 2, name: 'Hardcore', ruleCount: 3 },
];

function newSeed() {
  return Math.random().toString(36).slice(2, 8);
}

// Small seeded random number generator (mulberry32), seeded from a string.
function createRng(seed) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = h >>> 0;
  const next = () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return {
    pick: (list) => list[Math.floor(next() * list.length)],
    // Pick `count` different items from a list.
    sample: (list, count) => {
      const copy = [...list];
      const out = [];
      while (out.length < count && copy.length) {
        out.push(copy.splice(Math.floor(next() * copy.length), 1)[0]);
      }
      return out;
    },
  };
}

function teamPool(leagueId) {
  const leagues = leagueId === 'any' ? LEAGUES : LEAGUES.filter((l) => l.id === leagueId);
  return leagues.flatMap((league) => league.teams.map((team) => ({ ...team, league })));
}

// Great-circle distance in km between two clubs.
function distanceKm(a, b) {
  const rad = (deg) => (deg * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLon = rad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(h));
}

function nearest(team, clubs) {
  return clubs.reduce((best, t) => (distanceKm(team, t) < distanceKm(team, best) ? t : best));
}

// Derby rival: the nearest other club in the league.
// League rival: the nearest club of the same tier (the side you're fighting for
// places in the table), falling back to the next tier if there's no one left.
function findRivals(team, league) {
  const others = league.teams.filter((t) => t.name !== team.name);
  const derby = nearest(team, others);
  const candidates = others.filter((t) => t !== derby);
  const sameTier = candidates.filter((t) => t.tier === team.tier);
  const nearTier = candidates.filter((t) => Math.abs(t.tier - team.tier) === 1);
  const leagueRival = nearest(team, sameTier.length ? sameTier : nearTier.length ? nearTier : candidates);
  return { derby, leagueRival };
}

function stageFor(season, totalSeasons) {
  if (totalSeasons === 1) return 'early';
  const progress = (season - 1) / (totalSeasons - 1);
  if (progress < 0.34) return 'early';
  if (progress < 0.75) return 'mid';
  return 'late';
}

function generateStory({ leagueId, difficulty, seasons, teamSeed, storySeed }) {
  const team = createRng(teamSeed).pick(teamPool(leagueId));
  const { league } = team;
  const rng = createRng(storySeed);

  const rivals = findRivals(team, league);
  const derbyRival = rivals.derby.name;
  const leagueRival = rivals.leagueRival.name;
  const fill = (text) =>
    text
      .replaceAll('{team}', team.name)
      .replaceAll('{league}', league.name)
      .replaceAll('{country}', league.country)
      .replaceAll('{derbyRival}', derbyRival)
      .replaceAll('{leagueRival}', leagueRival);

  const archetype = rng.pick([
    ...ARCHETYPES[team.tier],
    ...DIFFICULTY_ARCHETYPES.filter((a) => a.level === difficulty && a.tiers.includes(team.tier)),
  ]);
  const diff = DIFFICULTIES[difficulty];
  const rules = rng
    .sample(RULES.filter((r) => r.level <= difficulty), diff.ruleCount)
    .map((r) => fill(r.text));

  const twists = rng.sample(TWISTS.filter((t) => t.level === difficulty), seasons).map((t) => t.text);
  const seasonPlan = Array.from({ length: seasons }, (_, i) => {
    const number = i + 1;
    return {
      number,
      objective: fill(rng.pick(OBJECTIVES[team.tier][stageFor(number, seasons)])),
      twist: fill(twists[i % twists.length]),
    };
  });

  return {
    team: team.name,
    tier: team.tier,
    league: league.name,
    country: league.country,
    derbyRival,
    leagueRival,
    title: archetype.title,
    premise: fill(archetype.premise),
    manager: {
      name: `${rng.pick(MANAGER_FIRST)} ${rng.pick(MANAGER_LAST)}`,
      style: rng.pick(PLAY_STYLES),
      formation: rng.pick(FORMATIONS),
    },
    difficulty: diff.name,
    rules,
    seasons: seasonPlan,
    finale: fill(rng.pick(FINALE)),
  };
}

function storyToText(story) {
  const lines = [
    `CAREER ARCHITECT: ${story.title.toUpperCase()}`,
    `${story.team} (${story.league}, ${story.country})`,
    '',
    story.premise,
    '',
    `Manager: ${story.manager.name}`,
    `Style: ${story.manager.style} (${story.manager.formation})`,
    `Derby rival: ${story.derbyRival}`,
    `League rival: ${story.leagueRival}`,
    '',
    `Rules (${story.difficulty}):`,
    ...story.rules.map((r) => `- ${r}`),
    '',
    ...story.seasons.flatMap((s) => [
      `Season ${s.number}`,
      `  Objective: ${s.objective}`,
      `  Twist: ${s.twist}`,
    ]),
    '',
    `Legacy goal: ${story.finale}`,
  ];
  return lines.join('\n');
}
