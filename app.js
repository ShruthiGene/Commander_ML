const budgetTiers = {
  starter: {
    maxCardPrice: 2,
    label: "$40-$80",
    note: "Mostly inexpensive staples and synergistic commons/uncommons."
  },
  friendly: {
    maxCardPrice: 8,
    label: "$80-$180",
    note: "A strong casual deck with a few meaningful upgrades."
  },
  upgraded: {
    maxCardPrice: 20,
    label: "$180-$400",
    note: "Higher consistency, better mana, and stronger role players."
  },
  premium: {
    maxCardPrice: 100,
    label: "$400+",
    note: "Powerful staples are allowed, but table power level matters a lot."
  }
};

const paceThemes = {
  fast: ["tokens", "spellslinger", "voltron"],
  midrange: ["graveyard", "counters", "artifacts"],
  slow: ["graveyard", "blink", "lifegain"]
};

const strategyThemes = {
  attack: ["voltron", "tokens", "counters"],
  combo: ["artifacts", "spellslinger", "graveyard"],
  control: ["blink", "lifegain", "graveyard"],
  value: ["graveyard", "blink", "counters"],
  creatures: ["tokens", "counters", "aristocrats"]
};

const flavorThemes = {
  cute: ["tokens", "lifegain", "counters"],
  vicious: ["aristocrats", "graveyard", "voltron"],
  tricky: ["spellslinger", "blink", "artifacts"],
  epic: ["dragons", "counters", "graveyard"]
};

const themeCopy = {
  aristocrats: {
    mark: "AR",
    label: "Sacrifice Value",
    description: "You make small creatures, sacrifice them for value, and drain opponents when your creatures die.",
    win: "Make expendable creatures, sacrifice them, and win through repeated drain effects.",
    invest: ["sacrifice outlets", "death payoffs", "token makers"],
    creatureTypes: ["Vampires", "Zombies", "Clerics", "Humans"],
    commanders: [
      ["Teysa Karlov", "WB", "Doubles death triggers and is clear about the plan."],
      ["Meren of Clan Nel Toth", "BG", "Recurs creatures and teaches graveyard value."],
      ["Judith, the Scourge Diva", "BR", "Turns dying creatures into pressure."]
    ],
    samples: [
      ["Blood Artist", "Death payoff that teaches the deck's core loop.", "B", 1.8],
      ["Zulaport Cutthroat", "A budget drain payoff for creature-heavy boards.", "B", 0.6],
      ["Viscera Seer", "Cheap sacrifice outlet with simple sequencing.", "B", 0.4]
    ]
  },
  artifacts: {
    mark: "AF",
    label: "Artifact Engine",
    description: "You use artifacts as mana, tools, and payoffs. Many cards are reusable across future decks.",
    win: "Use artifacts for mana and value, then win with artifact payoffs or a big board.",
    invest: ["mana rocks", "artifact payoffs", "protective pieces"],
    creatureTypes: ["Constructs", "Thopters", "Gnomes", "Vedalken"],
    commanders: [
      ["Alela, Artful Provocateur", "WUB", "Rewards artifacts and enchantments with flying tokens."],
      ["Saheeli, the Gifted", "UR", "Makes artifacts cheaper and creates artifact tokens."],
      ["Breya, Etherium Shaper", "WUBR", "Powerful artifact commander with many directions."]
    ],
    samples: [
      ["Arcane Signet", "Reusable fixing that goes in many future decks.", "WUBRG", 1.2],
      ["Mind Stone", "Ramp early, card later.", "", 0.5],
      ["Thought Vessel", "Ramp with a useful hand-size bonus.", "", 1.4]
    ]
  },
  blink: {
    mark: "BL",
    label: "Blink Value",
    description: "You exile and return your own creatures to reuse enter-the-battlefield abilities.",
    win: "Reuse enter-the-battlefield creatures until your value engine overwhelms the table.",
    invest: ["enter-the-battlefield creatures", "blink effects", "value engines"],
    creatureTypes: ["Elementals", "Spirits", "Wizards", "Beasts"],
    commanders: [
      ["Yarok, the Desecrated", "BGU", "Doubles enter-the-battlefield triggers."],
      ["Brago, King Eternal", "WU", "Blinks many permanents after combat damage."],
      ["Roon of the Hidden Realm", "GWU", "A straightforward blink commander."]
    ],
    samples: [
      ["Mulldrifter", "Simple card draw body for value decks.", "U", 0.4],
      ["Ephemerate", "Efficient blink spell with a second use.", "W", 1.7],
      ["Eternal Witness", "Gets back key cards and rewards replay effects.", "G", 1.5]
    ]
  },
  counters: {
    mark: "CT",
    label: "+1/+1 Counters",
    description: "You put counters on creatures, grow them over time, and attack with a bigger board.",
    win: "Grow a board of creatures with counters, then attack with protected threats.",
    invest: ["counter makers", "proliferate cards", "efficient creatures"],
    creatureTypes: ["Hydras", "Elves", "Mutants", "Oozes"],
    commanders: [
      ["Ezuri, Claw of Progress", "GU", "Rewards small creatures and grows one threat each combat."],
      ["Hamza, Guardian of Arashin", "GW", "Makes creature spells cheaper when you have counters."],
      ["Atraxa, Praetors' Voice", "WUBG", "Very strong proliferate commander; can be high-power."]
    ],
    samples: [
      ["Evolution Sage", "Turns land drops into more counters.", "G", 1.2],
      ["Good-Fortune Unicorn", "Adds counters without complex timing.", "GW", 0.5],
      ["Counterspell", "Interaction; not a +1/+1 counter card, but protects the plan.", "U", 1.25]
    ]
  },
  graveyard: {
    mark: "GY",
    label: "Graveyard Value",
    description: "You treat the graveyard like a second hand by filling it and replaying useful cards.",
    win: "Fill the graveyard, replay threats, and win by out-valuing removal.",
    invest: ["self-mill", "recursion", "sacrifice outlets"],
    creatureTypes: ["Zombies", "Fungi", "Shamans", "Elementals"],
    commanders: [
      ["Muldrotha, the Gravetide", "BGU", "Replays permanents from the graveyard and teaches value loops."],
      ["Meren of Clan Nel Toth", "BG", "Beginner-friendly recursion with creature sacrifice."],
      ["Sidisi, Brood Tyrant", "BGU", "Self-mills and makes Zombie tokens."]
    ],
    samples: [
      ["Eternal Witness", "A clear, reusable recursion example.", "G", 1.5],
      ["Sakura-Tribe Elder", "Ramp that is excellent with recursion.", "G", 0.75],
      ["Victimize", "A strong budget reanimation spell.", "B", 1.7]
    ]
  },
  lifegain: {
    mark: "LG",
    label: "Lifegain",
    description: "You gain life repeatedly, then use cards that reward life gain to build pressure.",
    win: "Gain life repeatedly, trigger payoffs, and turn a large life total into pressure.",
    invest: ["life gain triggers", "payoffs", "board protection"],
    creatureTypes: ["Clerics", "Angels", "Vampires", "Cats"],
    commanders: [
      ["Lathiel, the Bounteous Dawn", "GW", "Turns life gain into +1/+1 counters."],
      ["Karlov of the Ghost Council", "WB", "Turns life gain triggers into removal and attacks."],
      ["Dina, Soul Steeper", "BG", "Simple lifegain drain commander."]
    ],
    samples: [
      ["Soul Warden", "Easy trigger engine for creature-heavy tables.", "W", 1.4],
      ["Ajani's Pridemate", "Simple payoff that grows over time.", "W", 0.2],
      ["Marauding Blight-Priest", "Turns lifegain into table pressure.", "B", 0.2]
    ]
  },
  spellslinger: {
    mark: "SP",
    label: "Spell-Based",
    description: "You cast lots of instants and sorceries, then use payoffs that reward every spell.",
    win: "Cast cheap spells, draw more cards, and win through spell payoffs.",
    invest: ["cheap instants/sorceries", "cost reducers", "copy effects"],
    creatureTypes: ["Wizards", "Shamans", "Drakes", "Elementals"],
    commanders: [
      ["Talrand, Sky Summoner", "U", "Makes flying tokens when you cast instants and sorceries."],
      ["Veyran, Voice of Duality", "UR", "Doubles magecraft-style spell triggers."],
      ["Kykar, Wind's Fury", "URW", "Turns noncreature spells into Spirit tokens."]
    ],
    samples: [
      ["Ponder", "Cheap selection that smooths early turns.", "U", 1.6],
      ["Young Pyromancer", "Turns spells into board presence.", "R", 0.5],
      ["Talrand, Sky Summoner", "A clear payoff for casting instants and sorceries.", "U", 0.6]
    ]
  },
  tokens: {
    mark: "TK",
    label: "Creature Tokens",
    description: "You create many small creature tokens and turn quantity into damage or big attacks.",
    win: "Make many small creatures, then multiply or pump them into lethal attacks.",
    invest: ["token makers", "team pumps", "card draw"],
    creatureTypes: ["Saprolings", "Soldiers", "Spirits", "Squirrels"],
    commanders: [
      ["Rhys the Redeemed", "GW", "Makes and doubles creature tokens."],
      ["Adrix and Nev, Twincasters", "GU", "Doubles tokens in a simple, visible way."],
      ["Krenko, Mob Boss", "R", "Classic Goblin token commander."]
    ],
    samples: [
      ["Secure the Wastes", "Flexible token maker at instant speed.", "W", 0.8],
      ["Impact Tremors", "Turns every creature token into damage.", "R", 1.6],
      ["Beast Whisperer", "Keeps creature token decks from running dry.", "G", 1.2]
    ]
  },
  voltron: {
    mark: "VO",
    label: "One Big Attacker",
    description: "You focus resources on one protected creature, often your commander, and win through combat.",
    win: "Build one protected attacker and win through commander damage or evasive attacks.",
    invest: ["equipment/auras", "protection", "evasion"],
    creatureTypes: ["Knights", "Warriors", "Cats", "Dragons"],
    commanders: [
      ["Sram, Senior Edificer", "W", "Draws cards from auras and equipment."],
      ["Rafiq of the Many", "GWU", "Makes one attacker hit very hard."],
      ["Uril, the Miststalker", "RGW", "Aura-focused and hard to remove."]
    ],
    samples: [
      ["Swiftfoot Boots", "Protects the main attacker and gives haste.", "", 1.7],
      ["Rancor", "Cheap pressure that comes back.", "G", 1.1],
      ["All That Glitters", "Simple payoff for aura/equipment decks.", "W", 0.9]
    ]
  },
  dragons: {
    mark: "DR",
    label: "Dragons",
    description: "You ramp into large flying creatures. It feels epic but usually needs a bigger mana budget.",
    win: "Ramp into large flying threats and end games with combat damage.",
    invest: ["ramp", "cost reducers", "large threats"],
    creatureTypes: ["Dragons", "Shamans", "Treasure-makers"],
    commanders: [
      ["Miirym, Sentinel Wyrm", "GUR", "Copies Dragons and creates huge board states."],
      ["Lathliss, Dragon Queen", "R", "Straightforward mono-red Dragon payoff."],
      ["The Ur-Dragon", "WUBRG", "Iconic but expensive and complex five-color option."]
    ],
    samples: [
      ["Dragonlord's Servant", "Makes dragons cheaper.", "R", 0.4],
      ["Sarkhan's Triumph", "Finds the right dragon.", "R", 1.8],
      ["Lathliss, Dragon Queen", "A straightforward dragon payoff.", "R", 0.7]
    ]
  }
};

function formProfile(form) {
  const data = new FormData(form);
  return {
    colors: data.getAll("colors"),
    pace: data.get("pace"),
    flavor: data.get("flavor"),
    strategy: data.get("strategy"),
    budget: data.get("budget"),
    totalBudget: Number(data.get("totalBudget")),
    power: data.get("power"),
    complexity: data.get("complexity")
  };
}

function generateDirections(profile) {
  const scores = {};
  const add = (theme, points) => {
    scores[theme] = (scores[theme] || 0) + points;
  };
  (paceThemes[profile.pace] || []).forEach((theme) => add(theme, 3));
  (strategyThemes[profile.strategy] || [profile.strategy]).forEach((theme) => add(theme, 4));
  (flavorThemes[profile.flavor] || [profile.flavor]).forEach((theme) => add(theme, 2));

  return Object.entries(scores)
    .filter(([, score]) => score > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([theme, score]) => buildDirection(theme, score, profile));
}

function buildDirection(theme, score, profile) {
  const copy = themeCopy[theme] || themeCopy.graveyard;
  const budget = budgetTiers[profile.budget];
  return {
    theme,
    name: copy.label,
    score,
    mark: copy.mark,
    pace: profile.pace,
    why: `Fits a ${profile.strategy} strategy with a ${profile.flavor} feel at roughly $${profile.totalBudget}. Treat it as a starter direction, not a final deck.`,
    description: copy.description,
    manaPlan: manaPlan(profile.colors),
    winPlan: copy.win,
    invest: investmentRoles(theme, profile.pace),
    skeleton: deckSkeleton(theme, profile.pace),
    roadmap: [
      "First $25: reusable ramp, flexible removal, and budget lands.",
      `Next $50: stronger ${theme} payoffs and card draw that fits the plan.`,
      "Later: premium lands or staples only after testing at your table."
    ],
    caution: caution(theme, profile),
    commanders: filterCommanders(copy.commanders, profile.colors),
    creatureTypes: copy.creatureTypes,
    samples: filterSamples(copy.samples, profile.colors, budget.maxCardPrice),
    review: reviewDirection(theme, profile, copy.samples, budget)
  };
}

function filterCommanders(commanders, colors) {
  return commanders.filter((commander) => [...commander[1]].every((color) => colors.includes(color))).slice(0, 3);
}

function filterSamples(samples, colors, maxPrice) {
  return samples.filter((sample) => {
    const identity = sample[2];
    const fitsColors = !identity || [...identity].every((color) => colors.includes(color));
    return fitsColors && sample[3] <= maxPrice;
  });
}

function manaPlan(colors) {
  if (colors.length <= 1) return "Mostly basics, a few utility lands, and simple ramp.";
  if (colors.length === 2) return "Budget dual lands, Command Tower-style fixing, and ramp that finds both colors.";
  return "Spend early upgrades on mana fixing; three or more colors punish weak land bases.";
}

function investmentRoles(theme, pace) {
  const base = {
    tokens: ["token makers", "team pumps", "card draw"],
    graveyard: ["self-mill", "recursion", "sacrifice outlets"],
    artifacts: ["mana rocks", "artifact payoffs", "protective pieces"],
    spellslinger: ["cheap instants/sorceries", "cost reducers", "copy effects"],
    voltron: ["equipment/auras", "protection", "evasion"],
    counters: ["counter makers", "proliferate cards", "efficient creatures"],
    blink: ["enter-the-battlefield creatures", "blink effects", "value engines"],
    lifegain: ["life gain triggers", "payoffs", "board protection"],
    aristocrats: ["sacrifice outlets", "death payoffs", "token makers"],
    dragons: ["ramp", "cost reducers", "large threats"]
  }[theme] || ["synergy pieces", "mana support", "interaction"];

  if (pace === "fast") return ["cheap ramp", "one/two mana plays", ...base.slice(0, 2)];
  if (pace === "slow") return ["board wipes", "repeatable card advantage", ...base.slice(0, 2)];
  return ["ramp", "interaction", ...base.slice(0, 2)];
}

function deckSkeleton(theme, pace) {
  const skeleton = [
    pace === "fast" ? "34-36 lands if the curve is low" : "36-38 lands",
    "10 ramp or mana-fixing cards",
    "10 card draw/card advantage cards",
    "8-12 interaction cards",
    "2-4 board wipes or recovery cards",
    "25-35 theme cards",
    "2-4 clear win conditions"
  ];
  if (theme === "graveyard") skeleton.push("3-6 graveyard setup cards and 3-6 recursion payoffs");
  if (theme === "voltron") skeleton.push("10+ protection/evasion cards so the attacker survives");
  if (pace === "slow") skeleton.push("extra protection so you survive to the late game");
  return skeleton;
}

function caution(theme, profile) {
  const notes = [];
  if (profile.strategy === "combo" || ["spellslinger", "aristocrats", "graveyard"].includes(theme)) {
    notes.push("This can become rules-heavy; keep the first version simple.");
  }
  if (["high", "competitive"].includes(profile.power)) {
    notes.push("Ask before adding tutors, fast mana, or oppressive locks.");
  }
  if (profile.budget === "starter") {
    notes.push("Do not chase expensive staples yet; test the theme first.");
  }
  return notes.join(" ") || "Ask your playgroup about power level before optimizing.";
}

function reviewDirection(theme, profile, rawSamples, budget) {
  const issues = [];
  const legalSamples = filterSamples(rawSamples, profile.colors, budget.maxCardPrice);
  if (legalSamples.length === 0) issues.push("No sample cards fit both colors and budget.");
  if (profile.strategy === "combo" && profile.complexity === "low") issues.push("Combo can be rough for low-complexity beginners.");
  if (profile.totalBudget < 50) issues.push("Total budget may be tight for a comfortable first deck.");
  if (profile.pace === "fast" && ["dragons", "graveyard"].includes(theme)) issues.push("Fast version may need extra cheap setup.");
  return issues;
}

function render(profile) {
  const directions = generateDirections(profile);
  document.getElementById("summary-title").textContent = `${profile.colors.join("") || "Any Color"} ${title(profile.pace)} ${title(profile.strategy)}`;
  document.getElementById("directions").innerHTML = directions.map(directionTemplate).join("");
}

function directionTemplate(direction) {
  const reviewClass = direction.review.length ? "review warn" : "review";
  const reviewText = direction.review.length ? direction.review.join(" ") : "Review passed: budget, complexity, color, and skeleton checks look reasonable.";
  return `
    <article class="direction-card">
      <div class="direction-top">
        <div class="theme-mark">${direction.mark}</div>
        <div>
          <h3>${direction.name}</h3>
          <div class="meta-row">
            <span class="pill">${direction.pace}</span>
            <span class="pill">starter direction</span>
          </div>
        </div>
      </div>

      <p>${direction.description}</p>
      <p>${direction.why}</p>
      ${section("Mana plan", [direction.manaPlan])}
      ${section("Win plan", [direction.winPlan])}
      ${section("Suggested commanders", direction.commanders.length ? direction.commanders.map((commander) => `${commander[0]} (${commander[1]}): ${commander[2]}`) : ["No exact color-fit commander examples in this starter set. Try adding a color or use this as an archetype search."])}
      ${section("Common creature types", direction.creatureTypes)}
      ${section("Invest in", direction.invest)}
      ${section("Starter skeleton", direction.skeleton.slice(0, 7))}
      ${section("Upgrade roadmap", direction.roadmap)}
      ${section("Caution", [direction.caution])}
      <div>
        <div class="section-title">Sample cards</div>
        ${direction.samples.length ? direction.samples.map(sampleTemplate).join("") : "<p>No starter-budget examples fit these colors yet. Try adding another color or raising the budget tier.</p>"}
      </div>
      <div class="${reviewClass}">${reviewText}</div>
    </article>
  `;
}

function section(label, items) {
  return `
    <div>
      <div class="section-title">${label}</div>
      <ul class="mini-list">
        ${items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </div>
  `;
}

function sampleTemplate(sample) {
  return `
    <div class="sample-card">
      <strong>${sample[0]} · $${sample[3].toFixed(2)}</strong>
      <span>${sample[1]}</span>
    </div>
  `;
}

function title(value) {
  return value.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

const form = document.getElementById("coach-form");
const budgetSlider = form.elements.totalBudget;
const budgetValue = document.getElementById("budget-value");

budgetSlider.addEventListener("input", () => {
  budgetValue.textContent = `$${budgetSlider.value}`;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  render(formProfile(form));
});

form.addEventListener("change", () => {
  render(formProfile(form));
});

document.getElementById("reset-button").addEventListener("click", () => {
  form.reset();
  budgetValue.textContent = "$75";
  render(formProfile(form));
});

render(formProfile(form));
