// League and club data: [name, tier, latitude, longitude]
// tier: 1 = elite / title contender, 2 = established mid-table, 3 = underdog / strugglers
// Coordinates are the club's home ground (approximate) and decide the rivals:
// the derby rival is the nearest club, the league rival the nearest club of the same tier.
//
// Clubs are the 2026-27 season line-ups, taken from the openfootball database
// (github.com/openfootball/football.json, 2026-27 fixtures) and cross-checked
// against TheSportsDB. Edit freely to match your FC 27 save, e.g. clubs with
// different in-game names because of licensing.

const LEAGUES = [
  {
    id: 'eng1',
    name: 'Premier League',
    country: 'England',
    teams: [
      ['Arsenal', 1, 51.555, -0.108], ['Aston Villa', 2, 52.509, -1.885],
      ['Bournemouth', 2, 50.735, -1.838], ['Brentford', 2, 51.491, -0.289],
      ['Brighton & Hove Albion', 2, 50.862, -0.083], ['Chelsea', 1, 51.482, -0.191],
      ['Coventry City', 3, 52.448, -1.496], ['Crystal Palace', 2, 51.398, -0.086],
      ['Everton', 2, 53.427, -3.003], ['Fulham', 2, 51.475, -0.222],
      ['Hull City', 3, 53.746, -0.368], ['Ipswich Town', 3, 52.055, 1.145],
      ['Leeds United', 3, 53.778, -1.572], ['Liverpool', 1, 53.431, -2.961],
      ['Manchester City', 1, 53.483, -2.200], ['Manchester United', 1, 53.463, -2.291],
      ['Newcastle United', 1, 54.976, -1.622], ['Nottingham Forest', 2, 52.940, -1.133],
      ['Sunderland', 3, 54.915, -1.388], ['Tottenham Hotspur', 1, 51.604, -0.066],
    ],
  },
  {
    id: 'eng2',
    name: 'EFL Championship',
    country: 'England',
    teams: [
      ['Birmingham City', 2, 52.476, -1.868], ['Blackburn Rovers', 2, 53.729, -2.489],
      ['Bolton Wanderers', 2, 53.581, -2.536], ['Bristol City', 2, 51.440, -2.620],
      ['Burnley', 1, 53.789, -2.230], ['Cardiff City', 2, 51.473, -3.203],
      ['Charlton Athletic', 3, 51.486, 0.037], ['Derby County', 2, 52.915, -1.447],
      ['Lincoln City', 3, 53.218, -0.541], ['Middlesbrough', 2, 54.578, -1.217],
      ['Millwall', 2, 51.486, -0.051], ['Norwich City', 2, 52.622, 1.309],
      ['Portsmouth', 3, 50.796, -1.064], ['Preston North End', 3, 53.772, -2.688],
      ['Queens Park Rangers', 3, 51.509, -0.232], ['Sheffield United', 1, 53.370, -1.471],
      ['Southampton', 1, 50.906, -1.391], ['Stoke City', 2, 52.988, -2.176],
      ['Swansea City', 2, 51.643, -3.935], ['Watford', 2, 51.650, -0.402],
      ['West Bromwich Albion', 2, 52.509, -1.964], ['West Ham United', 1, 51.539, -0.017],
      ['Wolverhampton Wanderers', 1, 52.590, -2.130], ['Wrexham', 2, 53.052, -3.004],
    ],
  },
  {
    id: 'esp1',
    name: 'LALIGA',
    country: 'Spain',
    teams: [
      ['Alavés', 3, 42.837, -2.688], ['Athletic Club', 2, 43.264, -2.949],
      ['Atlético de Madrid', 1, 40.436, -3.600], ['FC Barcelona', 1, 41.381, 2.123],
      ['Celta Vigo', 2, 42.212, -8.740], ['Deportivo La Coruña', 3, 43.369, -8.417],
      ['Elche', 3, 38.267, -0.663], ['Espanyol', 3, 41.348, 2.076],
      ['Getafe', 3, 40.326, -3.715], ['Levante', 3, 39.495, -0.364],
      ['Málaga', 3, 36.734, -4.426], ['Osasuna', 2, 42.797, -1.637],
      ['Racing Santander', 3, 43.476, -3.793], ['Rayo Vallecano', 2, 40.392, -3.659],
      ['Real Betis', 2, 37.357, -5.982], ['Real Madrid', 1, 40.453, -3.688],
      ['Real Sociedad', 2, 43.301, -1.974], ['Sevilla', 2, 37.384, -5.971],
      ['Valencia', 2, 39.475, -0.358], ['Villarreal', 1, 39.944, -0.104],
    ],
  },
  {
    id: 'ger1',
    name: 'Bundesliga',
    country: 'Germany',
    teams: [
      ['FC Augsburg', 3, 48.323, 10.886], ['Bayer Leverkusen', 1, 51.038, 7.002],
      ['FC Bayern München', 1, 48.219, 11.625], ['Borussia Dortmund', 1, 51.493, 7.452],
      ['Borussia Mönchengladbach', 2, 51.175, 6.385], ['Eintracht Frankfurt', 2, 50.069, 8.645],
      ['1. FC Köln', 3, 50.934, 6.875], ['SC Freiburg', 2, 48.022, 7.830],
      ['Hamburger SV', 3, 53.587, 9.899], ['TSG Hoffenheim', 2, 49.239, 8.888],
      ['1. FSV Mainz 05', 2, 49.984, 8.224], ['SC Paderborn 07', 3, 51.731, 8.711],
      ['RB Leipzig', 1, 51.346, 12.348], ['FC Schalke 04', 2, 51.555, 7.068],
      ['SV Elversberg', 3, 49.314, 7.130], ['VfB Stuttgart', 1, 48.792, 9.232],
      ['1. FC Union Berlin', 2, 52.457, 13.568], ['SV Werder Bremen', 2, 53.066, 8.838],
    ],
  },
  {
    id: 'ita1',
    name: 'Serie A',
    country: 'Italy',
    teams: [
      ['Atalanta', 1, 45.709, 9.681], ['Bologna', 2, 44.492, 11.310],
      ['Cagliari', 3, 39.200, 9.137], ['Como', 2, 45.814, 9.072],
      ['Fiorentina', 2, 43.781, 11.282], ['Frosinone', 3, 41.634, 13.321],
      ['Genoa', 3, 44.416, 8.952], ['Inter', 1, 45.478, 9.124],
      ['Juventus', 1, 45.110, 7.641], ['Lazio', 2, 41.934, 12.455],
      ['Lecce', 3, 40.365, 18.209], ['AC Milan', 1, 45.478, 9.124],
      ['Monza', 3, 45.583, 9.308], ['Napoli', 1, 40.828, 14.193],
      ['Parma', 3, 44.795, 10.338], ['Roma', 1, 41.934, 12.455],
      ['Sassuolo', 3, 44.715, 10.649], ['Torino', 2, 45.042, 7.650],
      ['Udinese', 2, 46.082, 13.200], ['Venezia', 3, 45.428, 12.366],
    ],
  },
  {
    id: 'fra1',
    name: 'Ligue 1',
    country: 'France',
    teams: [
      ['Angers', 3, 47.460, -0.531], ['Auxerre', 3, 47.787, 3.589],
      ['Brest', 2, 48.403, -4.462], ['Le Havre', 3, 49.499, 0.170],
      ['Le Mans', 3, 47.959, 0.224], ['Lens', 2, 50.433, 2.815],
      ['Lille', 1, 50.612, 3.130], ['Lorient', 3, 47.749, -3.369],
      ['Olympique Lyonnais', 1, 45.765, 4.982], ['Olympique de Marseille', 1, 43.270, 5.396],
      ['AS Monaco', 1, 43.728, 7.416], ['OGC Nice', 2, 43.705, 7.193],
      ['Paris FC', 3, 48.842, 2.253], ['Paris Saint-Germain', 1, 48.841, 2.253],
      ['Stade Rennais', 2, 48.108, -1.713], ['Strasbourg', 2, 48.560, 7.755],
      ['Toulouse', 2, 43.583, 1.434], ['Troyes', 3, 48.307, 4.099],
    ],
  },
  {
    id: 'ned1',
    name: 'Eredivisie',
    country: 'Netherlands',
    teams: [
      ['ADO Den Haag', 3, 52.062, 4.382], ['Ajax', 1, 52.314, 4.942],
      ['AZ Alkmaar', 1, 52.613, 4.743], ['SC Cambuur', 3, 53.194, 5.805],
      ['Excelsior', 3, 51.917, 4.523], ['Feyenoord', 1, 51.894, 4.523],
      ['Fortuna Sittard', 3, 51.000, 5.867], ['Go Ahead Eagles', 2, 52.253, 6.170],
      ['FC Groningen', 2, 53.206, 6.593], ['SC Heerenveen', 2, 52.959, 5.937],
      ['NEC Nijmegen', 2, 51.826, 5.869], ['PEC Zwolle', 3, 52.513, 6.084],
      ['PSV', 1, 51.442, 5.467], ['Sparta Rotterdam', 3, 51.920, 4.434],
      ['Telstar', 3, 52.466, 4.600], ['FC Twente', 2, 52.237, 6.838],
      ['FC Utrecht', 2, 52.078, 5.146], ['Willem II', 3, 51.542, 5.066],
    ],
  },
  {
    id: 'por1',
    name: 'Liga Portugal',
    country: 'Portugal',
    teams: [
      ['Académico de Viseu', 3, 40.660, -7.912], ['Alverca', 3, 38.896, -9.040],
      ['Arouca', 3, 40.930, -8.244], ['Benfica', 1, 38.753, -9.185],
      ['SC Braga', 1, 41.563, -8.430], ['Casa Pia', 3, 38.720, -9.200],
      ['Estoril Praia', 2, 38.715, -9.395], ['Estrela da Amadora', 3, 38.757, -9.230],
      ['Famalicão', 2, 41.405, -8.522], ['Gil Vicente', 2, 41.535, -8.638],
      ['Marítimo', 3, 32.646, -16.938], ['Moreirense', 3, 41.375, -8.358],
      ['Nacional', 3, 32.670, -16.920], ['FC Porto', 1, 41.162, -8.584],
      ['Rio Ave', 2, 41.360, -8.740], ['Santa Clara', 2, 37.740, -25.670],
      ['Sporting CP', 1, 38.761, -9.161], ['Vitória de Guimarães', 2, 41.446, -8.301],
    ],
  },
].map((league) => ({
  ...league,
  teams: league.teams.map(([name, tier, lat, lon]) => ({ name, tier, lat, lon })),
}));
