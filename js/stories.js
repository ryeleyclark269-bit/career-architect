// Storyline building blocks.
// Placeholders filled in by the generator: {team} {league} {country} {derbyRival} {leagueRival}
// Add your own lines anywhere - the generator picks from whatever is here.

const ARCHETYPES = {
  // Elite clubs
  1: [
    {
      title: 'The Fallen Giant',
      premise: '{team} have gone three years without a trophy and the fanbase is in open revolt. The board has sacked two managers already. You are the last roll of the dice before a full rebuild.',
    },
    {
      title: 'Dynasty Under Pressure',
      premise: '{team} have won everything, but the squad is ageing and the stars are eyeing one last big contract elsewhere. Keep winning while you quietly tear the team down and build the next one.',
    },
    {
      title: 'The Accountants Have Arrived',
      premise: 'New owners at {team} want trophies and a profit. Every big signing has to be paid for with a sale, and the finance director watches every wage demand.',
    },
    {
      title: 'Shadow of a Legend',
      premise: 'Your predecessor at {team} is a club icon who stepped down after a decade of success. Every draw is compared to "the old days". You need to win your own way.',
    },
    {
      title: 'The Rivalry Reignited',
      premise: '{derbyRival} humiliated {team} in both derbies last season, and their fans still haven\'t stopped singing about it. Your supporters have one demand above all others: never lose to {derbyRival} again.',
    },
  ],
  // Established clubs
  2: [
    {
      title: 'Breaking the Glass Ceiling',
      premise: '{team} finish comfortably mid-table every year, never threatening the top and never in danger. The new chairman is bored of "comfortable". Break into Europe and stay there.',
    },
    {
      title: 'The Selling Club',
      premise: '{team} have a reputation for developing talent and selling it on. The scouting network is your lifeline, and the big clubs are already circling your best player.',
    },
    {
      title: 'Cup Specialists',
      premise: 'The league is a grind for {team}, but the fans live for cup nights. The board wants silverware. It doesn\'t have to be the league.',
    },
    {
      title: 'One Bad Season From Disaster',
      premise: '{team} narrowly escaped relegation last season after years of mismanagement. The squad is bloated, the wage bill is out of control, and you need to stabilise the club first.',
    },
    {
      title: 'The Local Hero Returns',
      premise: 'You grew up supporting {team} and played in their academy before your career took you abroad. Now you\'re back in the dugout, and the whole town expects you to bring the glory days home.',
    },
  ],
  // Underdogs
  3: [
    {
      title: 'The Great Escape',
      premise: '{team} are the bookies\' favourites for the drop and the squad is paper-thin. Nobody gives you a chance. Survival would be a miracle. Anything more would be legendary.',
    },
    {
      title: 'From the Ashes',
      premise: '{team} are coming out of a financial crisis. The budget is tiny and morale is at rock bottom. Rebuild the club brick by brick into a force in {country}.',
    },
    {
      title: 'The Moneyball Project',
      premise: 'A data-obsessed owner has bought {team} and wants to prove the model works. You can\'t outspend anyone, so you have to outthink them: undervalued players, smart sales, relentless progress.',
    },
    {
      title: 'The Academy Revolution',
      premise: '{team} can\'t compete in the transfer market, so the board has bet everything on the youth academy. Build a team of homegrown heroes and take on the giants of the {league}.',
    },
    {
      title: 'Minnows to Monsters',
      premise: 'The long game. Take {team} from underdogs to the top of the {league}, and then to the top of Europe. It will take years. That\'s the point.',
    },
  ],
};

// Extra storylines tied to a difficulty. level: 0 = Casual, 1 = Standard, 2 = Hardcore.
// They join the tier storylines above, but only for saves at that exact difficulty
// and only for clubs whose tier is listed.
const DIFFICULTY_ARCHETYPES = [
  // Casual
  {
    level: 0,
    tiers: [1, 2, 3],
    title: 'The Fresh Start',
    premise: '{team} have hired you as a bright young coach, and the board and fans are fully behind you. There\'s no pressure yet. Build a team you love watching and enjoy the ride.',
  },
  {
    level: 0,
    tiers: [2, 3],
    title: 'The Takeover Dream',
    premise: 'A wealthy new owner has just bought {team} and wants a statement. The transfer budget has never been bigger. Spend it wisely and turn the club into a {league} powerhouse.',
  },

  // Standard
  {
    level: 1,
    tiers: [1, 2, 3],
    title: 'The Derby Drought',
    premise: '{team} haven\'t beaten {derbyRival} in years, and the fans are sick of the jokes. Whatever else happens, the board has made one thing clear: end the drought, or you\'re gone.',
  },
  {
    level: 1,
    tiers: [2, 3],
    title: 'Chasing Shadows',
    premise: '{leagueRival} have left {team} behind: bigger crowds, better players, more trophies. The chairman wants that gap closed before your contract runs out.',
  },
  {
    level: 1,
    tiers: [1, 2],
    title: 'The Fire Sale',
    premise: 'Financial rules have finally caught up with {team}. The three highest earners must be sold before the season starts, and the board still expects you to compete.',
  },
  {
    level: 1,
    tiers: [1, 2, 3],
    title: 'Old Guard, New Tricks',
    premise: 'The {team} dressing room is run by veterans who don\'t rate you. Win them over, or move them on, before they get you sacked.',
  },

  // Hardcore
  {
    level: 2,
    tiers: [1, 2, 3],
    title: 'The Points Deduction',
    premise: '{team} start the season with a 15-point deduction for financial breaches. Take the points off your total every time you check the table. Survival comes first, and anything more is a miracle.',
  },
  {
    level: 2,
    tiers: [1, 2, 3],
    title: 'The Transfer Embargo',
    premise: '{team} are banned from registering new players for two transfer windows. Until the embargo lifts, every addition must come from the academy or the free-agent list.',
  },
  {
    level: 2,
    tiers: [1, 2, 3],
    title: 'The One-Year Deal',
    premise: 'The board at {team} doesn\'t trust you. You\'re on a rolling one-year contract, renewed only if you hit every board objective. Miss one, and the save is over.',
  },
  {
    level: 2,
    tiers: [1, 2],
    title: 'Scorched Earth',
    premise: 'Your predecessor sold the spine of {team} on the way out the door. Before your first match, sell or release your best goalkeeper, centre-back, midfielder and striker, then rebuild with no extra budget.',
  },
];

// Board objectives per stage of the save. Keyed by tier, then stage.
const OBJECTIVES = {
  1: {
    early: ['Win the {league} title', 'Reach the Champions League semi-finals', 'Win a domestic cup and finish top two', 'Finish above {leagueRival}'],
    mid: ['Win the {league} title', 'Win the Champions League', 'Complete a domestic double', 'Go the whole league season unbeaten at home'],
    late: ['Win the treble', 'Win the Champions League', 'Win three consecutive league titles', 'Win the league with an average squad age under 25'],
  },
  2: {
    early: ['Finish in the top half', 'Reach a domestic cup semi-final', 'Finish above {leagueRival}', 'Qualify for Europe'],
    mid: ['Qualify for the Champions League', 'Win a domestic cup', 'Reach a European quarter-final', 'Finish in the top four'],
    late: ['Win the {league} title', 'Win a European trophy', 'Reach the Champions League knockout rounds', 'Win the league and a cup in the same season'],
  },
  3: {
    early: ['Avoid relegation', 'Avoid relegation with at least one game to spare', 'Finish above {leagueRival}', 'Reach a cup quarter-final'],
    mid: ['Finish in the top half', 'Qualify for Europe', 'Reach a domestic cup final', 'Break the club\'s record points total'],
    late: ['Qualify for the Champions League', 'Win a domestic trophy', 'Win the {league} title', 'Win a European trophy'],
  },
};

// Save rules / restrictions. level: 0 = Casual, 1 = Standard, 2 = Hardcore.
// A rule is available at its level and above.
const RULES = [
  { level: 0, text: 'Your starting XI must always include at least one academy graduate.' },
  { level: 0, text: 'Promote at least two youth players to the first team every season.' },
  { level: 0, text: 'Pick one formation and never change it for the first season.' },
  { level: 0, text: 'Name a club captain in your first match. They can\'t be sold while they\'re at the club.' },
  { level: 0, text: 'Every summer, sign at least one player aged 21 or under.' },
  { level: 1, text: 'No player may earn more than double the current club captain\'s wage.' },
  { level: 1, text: 'Maximum of three incoming signings per transfer window.' },
  { level: 1, text: 'No loan signings. You build with players you own.' },
  { level: 1, text: 'Only sign players from {country} or the club\'s own academy for the first season.' },
  { level: 1, text: 'Every player over 30 must be sold or released at the end of each season.' },
  { level: 1, text: 'No transfer fee may be higher than the club\'s record signing.' },
  { level: 1, text: 'Sell your highest-rated player before the first season starts.' },
  { level: 2, text: 'No transfers in for the entire first season. Academy and free agents only.' },
  { level: 2, text: 'You may never sign a player rated higher than your best current player.' },
  { level: 2, text: 'Sim nothing. Every competitive match must be played.' },
  { level: 2, text: 'If you lose three league games in a row, you must sell a first-team starter.' },
  { level: 2, text: 'No players from the top five leagues may be signed. Scout the rest of the world.' },
  { level: 2, text: 'Your squad must never exceed 22 senior players.' },
];

// Things that happen during a season. level: 0 = Casual, 1 = Standard, 2 = Hardcore.
// A save only draws twists from its own difficulty level.
const TWISTS = [
  // Casual
  { level: 0, text: 'A wonderkid emerges from your academy. He must start at least 15 league games this season.' },
  { level: 0, text: 'A local-born player at the club becomes a fan favourite. He can\x27t be sold this season.' },
  { level: 0, text: 'A viral fan campaign demands you bring back a club legend. Re-sign a former player, or sign someone from {country} over 30.' },
  { level: 0, text: 'The club gets a surprise windfall. Spend at least half of it on a single marquee signing.' },
  { level: 0, text: 'A club legend joins the coaching staff. Fast-track one youth player into the matchday squad.' },
  { level: 0, text: 'The board hands you a bonus scouting budget. Send a scout to a country you\x27ve never scouted before.' },
  { level: 0, text: 'Your captain is voted player of the month. He keeps the armband for the rest of the season, whatever happens.' },
  { level: 0, text: 'The fans vote for a new third kit. Wear it in every cup match this season.' },
  { level: 0, text: 'A summer tour wins the club thousands of new fans abroad. Sign one player from a league outside Europe this season.' },

  // Standard
  { level: 1, text: 'Your star striker hands in a transfer request in January. You must sell him, or stop starting him until the summer.' },
  { level: 1, text: 'A season-ending injury hits your captain in October. Promote a youth player to the first-team squad to cover.' },
  { level: 1, text: 'The board slashes the transfer budget by 30% after a disappointing financial report.' },
  { level: 1, text: '{leagueRival} make a public bid for your best midfielder. If they bid again, you must accept.' },
  { level: 1, text: 'A takeover rumour rocks the club. You may not sign anyone over 27 until the end of the season.' },
  { level: 1, text: 'Your assistant manager leaves for a rival. Change your formation from the next match onwards.' },
  { level: 1, text: 'An injury crisis hits the defence. Sign a free agent centre-back before the next match.' },
  { level: 1, text: 'Your goalkeeper is dropped from his national team and loses confidence. Bench him for three matches.' },
  { level: 1, text: 'Your top scorer is ruled out for two months. Play a false nine until he returns.' },
  { level: 1, text: 'A rival manager publicly criticises your style. Beat {derbyRival} this season to silence the doubters.' },
  { level: 1, text: 'The board is watching the table. If {leagueRival} are above you at Christmas, your January budget is halved.' },
  { level: 1, text: 'Your first-choice striker falls out with the coaching staff. Drop him for the next five league games.' },
  { level: 1, text: '{derbyRival} poach one of your coaches. Lose the next derby and the board cuts your wage budget by 10%.' },
  { level: 1, text: 'A key midfielder refuses to sign a new contract. Sell him in the next window, or let him leave for free in the summer.' },
  { level: 1, text: 'The board demands a younger squad. Your starting XI must average under 26 by the end of the season.' },
  { level: 1, text: 'A big club offers double the value for your best youth prospect. Accept, and spend the fee on two players under 21.' },
  { level: 1, text: 'Injuries ravage your full-backs. Play a back three until the end of the month.' },
  { level: 1, text: 'The club\x27s shirt sponsor pulls out. Sell a player worth at least 10% of the squad value before the window shuts.' },
  { level: 1, text: 'Fixture congestion hits. Make at least five changes to your starting XI for every cup match this season.' },
  { level: 1, text: 'Your captain criticises your tactics in the press. Strip him of the armband and give it to a player under 24.' },
  { level: 1, text: '{leagueRival} sign your top transfer target. Answer back by signing a player in the same position before the window closes.' },

  // Hardcore
  { level: 2, text: 'A mid-season slump puts you on thin ice. Win your next two league games or pick a new tactical style.' },
  { level: 2, text: 'Your best player suffers a serious injury. Leave him out of the squad for the rest of the season, even if he recovers early.' },
  { level: 2, text: 'The board freezes all transfers for the next window. Academy players and free agents only.' },
  { level: 2, text: 'An admin error lands the club a six-point deduction. Take it off your total and still hit your objective.' },
  { level: 2, text: 'Three first-team players demand to leave. Sell all three before the next window closes.' },
  { level: 2, text: 'Your first-choice goalkeeper is out for the season. Start your youngest keeper in every league game.' },
  { level: 2, text: 'The owner sacks the entire scouting network. No new scouting assignments for the rest of the season.' },
  { level: 2, text: 'Lose to {derbyRival} this season and you must sell your captain in the next window.' },
  { level: 2, text: 'The board slashes the wage budget by 40%. Sell or release players until you\x27re back under it.' },
  { level: 2, text: 'A virus sweeps through the squad. Start at least four academy players in each of your next three matches.' },
  { level: 2, text: 'Your star player is banned for ten matches. You may not sign a replacement. Adapt.' },
];

const PLAY_STYLES = [
  'Tiki-taka possession', 'Gegenpressing', 'Counter-attacking', 'Wing play and crosses',
  'Low block and long balls', 'Fluid total football', 'Direct and physical', 'High line, high risk',
];

const FORMATIONS = [
  '4-3-3', '4-2-3-1', '4-4-2', '3-5-2', '3-4-3', '4-1-2-1-2', '5-3-2', '4-3-2-1', '4-5-1',
];

const MANAGER_FIRST = [
  'Luca', 'Mateo', 'Jonas', 'Callum', 'Rafael', 'Thierry', 'Andrés', 'Ole', 'Nico', 'Dario',
  'Kasper', 'Sam', 'Yusuf', 'Hugo', 'Eamon', 'Tomás', 'Kenji', 'Marcus', 'Pieter', 'Emre',
];

const MANAGER_LAST = [
  'Moretti', 'Hartley', 'Vidal', 'Kowalski', 'Brennan', 'Lindqvist', 'Ferreira', 'Okafor', 'Duval', 'Schneider',
  'de Vries', 'Castillo', 'Novak', 'Rossi', 'Whitmore', 'Albers', 'Santos', 'Delgado', 'Fischer', 'MacLeod',
];

const FINALE = [
  'Leave {team} as the most successful manager in club history.',
  'Get a statue built outside the stadium: win the club\'s biggest trophy.',
  'Hand over a squad where the core of the starting XI came through your academy.',
  'Finish the save with {team} above {derbyRival} in the all-time head-to-head under your management.',
  'Finish above {leagueRival} in every season of the save.',
  'Bring {team} to a Champions League night they\'ll never forget.',
];
