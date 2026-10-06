# Career Architect

A storyline generator for EA SPORTS FC 27 Career Mode. Pick a league and it gives you a random club and a full save to play out: a premise, a manager identity, save rules, season-by-season objectives and twists, and a legacy goal.

## Running it

There's nothing to install. Double-click `index.html` to open it in your browser.

## Using it

- **League**: pick one, or choose "Any league" for a random club from anywhere.
- **Difficulty**: controls how many save rules you get and how harsh they are, which twists can happen, and unlocks extra storylines for that difficulty.
- **Save length**: 1, 3 or 5 seasons. Objectives get tougher as the save goes on.
- **New team & story**: rerolls everything.
- **Same team, new story**: keeps the club and rerolls the storyline.
- **Copy link**: the URL stores the whole story, so anyone with the link sees the same one.

## Project layout

```
index.html        the page
css/styles.css    styling (light and dark mode)
js/leagues.js     leagues and clubs, each with a tier (1 elite, 2 established, 3 underdog)
js/stories.js     all the story text: archetypes, objectives, rules, twists, names
js/generator.js   builds a story from a league and random seeds
js/app.js         connects the page controls to the generator
```

## Customising

- **Clubs**: leagues use the 2026-27 line-ups from the [openfootball](https://github.com/openfootball/football.json) database. Edit `js/leagues.js` to add a league or to match your save. Some clubs have different names in-game because of licensing.
- **Rivals**: each club gets a derby rival (the nearest other club in its league) and a league rival (the nearest club of the same tier), based on the coordinates in `js/leagues.js`.
- **Story content**: add lines to any list in `js/stories.js`. Use `{team}`, `{league}`, `{country}`, `{derbyRival}` and `{leagueRival}` as placeholders.
- **Tiers**: a club's tier decides which storylines and objectives it gets. Change a tier if you disagree with it.
