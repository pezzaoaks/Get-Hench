"use client"

// @ts-nocheck
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, PlayCircle, Search, TimerReset, CheckCircle2, Play, Pause, RotateCcw, SkipBack, SkipForward } from "lucide-react";

const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

const EXERCISES = [
  {
    id: "incline-pushup",
    name: "Incline Push-Up (hands on chair/table)",
    tags: ["push", "chest", "triceps", "beginner"],
    steps: [
      "Place hands on a stable chair/table, slightly wider than shoulders.",
      "Walk feet back so body forms a straight line head→heels.",
      "Lower chest toward the edge (elbows ~30–45° from body).",
      "Press back up, keep ribs down and glutes lightly squeezed."
    ],
    cues: [
      "Think: ‘move as one plank’.",
      "If wrists are sore: use fists or push-up handles/books."
    ],
    links: [
      {
        type: "video",
        label: "Push-up technique (YouTube)",
        url: "https://www.youtube.com/watch?v=NscVGLYbv10",
        youtubeId: "NscVGLYbv10"
      }
    ]
  },
  {
    id: "pushup",
    name: "Push-Up (knees or full)",
    tags: ["push", "chest", "triceps"],
    steps: [
      "Hands under shoulders, screw hands into floor (spread fingers).",
      "Brace: ribs down, glutes on, body straight.",
      "Lower under control until chest is just above floor.",
      "Press up, keep elbows angled slightly back."
    ],
    cues: [
      "Start on knees if you can’t keep a straight line.",
      "Quality > reps — stop before hips sag."
    ],
    links: [
      {
        type: "video",
        label: "Push-up technique (YouTube)",
        url: "https://www.youtube.com/watch?v=NscVGLYbv10",
        youtubeId: "NscVGLYbv10"
      },
      {
        type: "video",
        label: "Quick push-up tips (TikTok)",
        url: "https://www.tiktok.com/@swluis_/video/7607466629345086738"
      }
    ]
  },
  {
    id: "negative-pushup",
    name: "Negative Push-Up (slow lowering)",
    tags: ["push", "strength", "beginner"],
    steps: [
      "Start in top of push-up position.",
      "Lower for 3–5 seconds, staying rigid.",
      "At bottom, place knees down and reset to top.",
      "Repeat for the prescribed reps."
    ],
    cues: [
      "Aim for control — don’t ‘fall’.",
      "Keep neck long, eyes on the floor."
    ],
    links: [
      {
        type: "guide",
        label: "How to do Negative Push-Up (Calixpert)",
        url: "https://www.calixpert.com/exercises/negative-push-up"
      },
      {
        type: "guide",
        label: "Negative push-up guide (MasterClass)",
        url: "https://www.masterclass.com/articles/negative-push-up-guide"
      },
      {
        type: "guide",
        label: "Negative push-up tips (Endomondo)",
        url: "https://www.endomondo.com/exercise/negative-push-up"
      }
    ]
  },
  {
    id: "pike-pushup",
    name: "Pike Push-Up (shoulders)",
    tags: ["push", "shoulders"],
    steps: [
      "From a plank, walk feet toward hands so hips rise (inverted V).",
      "Hands shoulder-width, elbows track back slightly.",
      "Lower head toward the floor between hands.",
      "Press back up, keep weight toward the shoulders."
    ],
    cues: [
      "Bend knees a bit if hamstrings are tight.",
      "Stop if shoulder pinch — adjust hand width/angle."
    ],
    links: [
      {
        type: "video",
        label: "Negative Pike Push-Up (YouTube)",
        url: "https://www.youtube.com/watch?v=QMhlLV9QrCc",
        youtubeId: "QMhlLV9QrCc"
      }
    ]
  },
  {
    id: "chair-dip",
    name: "Chair Dip (bench dip)",
    tags: ["push", "triceps"],
    steps: [
      "Hands on chair edge, fingers forward, shoulders down.",
      "Slide hips off chair; feet on floor, knees bent to start.",
      "Lower until elbows ~90°.",
      "Press up by straightening elbows; keep chest open."
    ],
    cues: [
      "If shoulders feel cranky: reduce depth.",
      "Keep shoulders away from ears."
    ],
    links: [
      {
        type: "article",
        label: "Dips in beginner push list (The Fitness Phantom)",
        url: "https://thefitnessphantom.com/calisthenics-push-workout-for-beginner"
      }
    ]
  },
  {
    id: "rows",
    name: "Bodyweight Row / Inverted Row (under table / low bar)",
    tags: ["pull", "back", "biceps"],
    steps: [
      "Use a sturdy table/low bar; check stability first.",
      "Hold edge/bar, body straight, heels on floor.",
      "Pull chest toward table by squeezing shoulder blades.",
      "Lower under control, keep hips up and core tight."
    ],
    cues: [
      "Bend knees to make it easier.",
      "Keep neck neutral; don’t shrug."
    ],
    links: [
      {
        type: "video",
        label: "Inverted Row tutorial (YouTube)",
        url: "https://www.youtube.com/watch?v=ANRxrCoilHc",
        youtubeId: "ANRxrCoilHc"
      },
      {
        type: "guide",
        label: "Inverted row ultimate guide (Nerd Fitness)",
        url: "https://www.nerdfitness.com/blog/inverted-row-are-you-missing-out-on-this-great-exercise/"
      },
      {
        type: "guide",
        label: "Inverted row under table (Lyfta)",
        url: "https://www.lyfta.app/exercise/inverted-row-under-table-8p8"
      }
    ]
  },
  {
    id: "dead-bug",
    name: "Dead Bug",
    tags: ["core", "stability", "beginner"],
    steps: [
      "Lie on back; hips/knees at 90°, arms up.",
      "Exhale to flatten low back to floor (ribs down).",
      "Slowly extend opposite arm + leg.",
      "Return and alternate — keep back glued to floor."
    ],
    cues: [
      "Move slower than you think.",
      "Stop the leg before your back arches."
    ],
    links: [
      {
        type: "video",
        label: "Dead Bug guide (Bodybuilding.com YouTube)",
        url: "https://www.youtube.com/watch?v=4XLEnwUr1d8",
        youtubeId: "4XLEnwUr1d8"
      },
      {
        type: "video",
        label: "Dead Bug complete guide (YouTube)",
        url: "https://www.youtube.com/watch?v=f5_lFmX8zpk",
        youtubeId: "f5_lFmX8zpk"
      }
    ]
  },
  {
    id: "plank",
    name: "Forearm Plank",
    tags: ["core", "isometric"],
    steps: [
      "Elbows under shoulders; forearms parallel.",
      "Step feet back; body straight line.",
      "Squeeze glutes; pull ribs down; brace abs.",
      "Hold while breathing slowly."
    ],
    cues: [
      "End the set when form breaks.",
      "If hard: drop knees and keep the same brace."
    ],
    links: [
      {
        type: "video",
        label: "Forearm plank tutorial (YouTube)",
        url: "https://www.youtube.com/watch?v=YvWpFJi-Tzw",
        youtubeId: "YvWpFJi-Tzw"
      },
      {
        type: "guide",
        label: "Forearm plank cues (MuscleWiki)",
        url: "https://musclewiki.com/exercise/forearm-plank"
      }
    ]
  },
  {
    id: "hollow-hold",
    name: "Hollow Hold / Hollow Rock",
    tags: ["core", "gymnastics"],
    steps: [
      "Lie on back; press low back into floor.",
      "Lift shoulders + legs slightly; arms overhead or forward.",
      "Hold tension (no arching).",
      "For rocks: gently rock while keeping hollow shape."
    ],
    cues: [
      "If back lifts: bend knees or bring arms forward.",
      "Think ‘zip up ribs to hips’."
    ],
    links: [
      {
        type: "video",
        label: "Hollow body progressions (YouTube)",
        url: "https://www.youtube.com/watch?v=HAfUt2Cco74",
        youtubeId: "HAfUt2Cco74"
      },
      {
        type: "guide",
        label: "Hollow hold form guide (BarBend)",
        url: "https://barbend.com/hollow-hold/"
      }
    ]
  },
  {
    id: "shoulder-taps",
    name: "Plank Shoulder Taps",
    tags: ["core", "anti-rotation", "shoulders"],
    steps: [
      "Start in high plank (hands under shoulders).",
      "Widen feet for stability.",
      "Tap opposite shoulder without shifting hips.",
      "Alternate sides slowly."
    ],
    cues: [
      "If hips sway: widen stance + slow down.",
      "Brace abs before each tap."
    ],
    links: [
      {
        type: "video",
        label: "High plank shoulder tap tutorial (YouTube)",
        url: "https://www.youtube.com/watch?v=eNh_Lf6x6d8",
        youtubeId: "eNh_Lf6x6d8"
      }
    ]
  },
  {
    id: "reverse-crunch",
    name: "Reverse Crunch",
    tags: ["core", "lower abs"],
    steps: [
      "Lie on back; knees bent to 90°.",
      "Curl pelvis up (tailbone lifts), not swinging legs.",
      "Pause at top, then lower slowly.",
      "Keep low back controlled throughout."
    ],
    cues: [
      "Move small and controlled.",
      "Exhale as hips lift."
    ],
    links: [
      {
        type: "video",
        label: "Reverse crunch tutorial (YouTube)",
        url: "https://www.youtube.com/watch?v=gAyTBB4lm3I",
        youtubeId: "gAyTBB4lm3I"
      }
    ]
  },
  {
    id: "russian-twist",
    name: "Russian Twists",
    tags: ["core", "obliques"],
    steps: [
      "Sit tall, knees bent, lean back slightly.",
      "Keep chest proud; rotate ribcage side to side.",
      "Tap hands/weight lightly beside hip.",
      "Keep hips steady — rotate through torso."
    ],
    cues: [
      "If back bothers you: keep heels down and reduce lean.",
      "Slow rotation beats speed."
    ],
    links: [
      {
        type: "video",
        label: "Russian twist tutorial (YouTube)",
        url: "https://www.youtube.com/watch?v=wkD8rjkodUI",
        youtubeId: "wkD8rjkodUI"
      }
    ]
  },
  {
    id: "bent-knee-leg-raise",
    name: "Lying Bent-Knee Leg Raises",
    tags: ["core", "beginner"],
    steps: [
      "Lie on back; knees bent ~90°.",
      "Brace and lift knees toward chest using abs.",
      "Lower slowly without arching back.",
      "Repeat with control."
    ],
    cues: [
      "Keep low back down.",
      "Hands under hips can help for support."
    ],
    links: [
      {
        type: "guide",
        label: "Laying bent leg raises (Calixpert)",
        url: "https://www.calixpert.com/exercises/laying-bent-leg-raises"
      },
      {
        type: "video",
        label: "Bent knee leg raise (YouTube)",
        url: "https://www.youtube.com/watch?v=RszT4NDXTE4",
        youtubeId: "RszT4NDXTE4"
      }
    ]
  },
  {
    id: "superman",
    name: "Superman Hold",
    tags: ["posterior", "core"],
    steps: [
      "Lie face down, arms overhead.",
      "Lift chest and legs slightly.",
      "Hold 10–20 seconds, breathe.",
      "Lower gently and repeat."
    ],
    cues: [
      "Lift ‘long’, not ‘high’.",
      "Keep neck neutral."
    ],
    links: [
      {
        type: "guide",
        label: "Calisthenics exercise library (includes superman variants)",
        url: "https://fitnessprogramer.com/101-calisthenics-exercises/"
      }
    ]
  },
  {
    id: "glute-bridge",
    name: "Glute Bridge",
    tags: ["posterior", "support"],
    steps: [
      "Lie on back, knees bent, feet flat.",
      "Exhale, squeeze glutes and lift hips.",
      "Hold 1 second at top.",
      "Lower slowly and repeat."
    ],
    cues: [
      "Don’t over-arch low back.",
      "Drive through heels."
    ],
    links: [
      {
        type: "guide",
        label: "Calisthenics exercise library (includes bridges)",
        url: "https://fitnessprogramer.com/101-calisthenics-exercises/"
      }
    ]
  },
  {
    id: "slow-mountain-climbers",
    name: "Slow Mountain Climbers",
    tags: ["core", "conditioning"],
    steps: [
      "Start in high plank.",
      "Bring one knee forward slowly, then return.",
      "Alternate sides with minimal hip shift.",
      "Keep shoulders stacked over hands."
    ],
    cues: [
      "Think control, not speed.",
      "If shoulders burn: elevate hands on a chair."
    ],
    links: [
      {
        type: "video",
        label: "Slow mountain climber tutorial (YouTube)",
        url: "https://www.youtube.com/watch?v=rte-AzwLcUw",
        youtubeId: "rte-AzwLcUw"
      }
    ]
  },
  {
    id: "scapular-pushups",
    name: "Scapular Push-Ups (warm-up)",
    tags: ["shoulders", "warmup"],
    steps: [
      "High plank with elbows locked.",
      "Let chest sink slightly as shoulder blades come together.",
      "Push the floor away to spread shoulder blades.",
      "Repeat slowly — arms stay straight."
    ],
    cues: [
      "Movement is in shoulder blades, not elbows.",
      "Keep core tight so hips don’t sag."
    ],
    links: [
      {
        type: "video",
        label: "Scapular push-up tutorial (YouTube)",
        url: "https://www.youtube.com/watch?v=IZT_tW3G6ug",
        youtubeId: "IZT_tW3G6ug"
      },
      {
        type: "guide",
        label: "Scap push-ups step-by-step (Horton Barbell)",
        url: "https://hortonbarbell.com/scap-pushups/"
      }
    ]
  }
];

const PLAN = {
  overview: {
    daysPerWeek: 3,
    sessionLength: "30–40 min",
    focus: "Core + Upper Body",
    rest: "At least 1 day between sessions (e.g., Mon/Wed/Fri)",
    rules: [
      "Warm up 5 min, then main sets, optional finisher, cool down.",
      "Stop each set 1–2 reps before form breaks.",
      "If an exercise is too hard: reduce reps, increase incline, or shorten holds."
    ]
  },
  weeks: [
    {
      week: 1,
      title: "Foundation",
      warmup: ["Arm circles", "March in place", "Cat-cow", "Plank walkouts (inchworms)"],
      workout: {
        rounds: 3,
        rest: "60–90 sec between rounds",
        items: [
          { ex: "Incline Push-Up (hands on chair/table)", dose: "8 reps" },
          { ex: "Dead Bug", dose: "10/side" },
          { ex: "Negative Push-Up (slow lowering)", dose: "5 reps (3–5s down)" },
          { ex: "Forearm Plank", dose: "20 sec" },
          { ex: "Bodyweight Row / Inverted Row (under table / low bar)", dose: "6 reps" },
          { ex: "Glute Bridge", dose: "12 reps" }
        ]
      },
      finisher: ["High-knees march: 30 sec", "Plank: 20 sec"]
    },
    {
      week: 2,
      title: "Strength & Stability",
      warmup: ["Same as week 1"],
      workout: {
        rounds: 4,
        rest: "60 sec between rounds",
        items: [
          { ex: "Incline Push-Up (hands on chair/table)", dose: "10 reps" },
          { ex: "Bodyweight Row / Inverted Row (under table / low bar)", dose: "8 reps" },
          { ex: "Plank (knee-to-elbow version)", dose: "10/side (optional)" },
          { ex: "Hollow Hold / Hollow Rock", dose: "15 sec" },
          { ex: "Negative Push-Up (slow lowering)", dose: "6 reps" },
          { ex: "Superman Hold", dose: "15 sec" }
        ]
      },
      finisher: ["Slow mountain climbers: 20 reps", "Side plank: 20 sec/side"]
    },
    {
      week: 3,
      title: "Moderate Difficulty",
      warmup: ["Week 1 warm-up + 10 scapular push-ups"],
      workout: {
        rounds: 4,
        rest: "45–60 sec between rounds",
        items: [
          { ex: "Push-Up (knees or full)", dose: "8–10 reps" },
          { ex: "Bodyweight Row / Inverted Row (under table / low bar)", dose: "10 reps" },
          { ex: "Hollow Hold / Hollow Rock", dose: "10 hollow rocks" },
          { ex: "Plank Shoulder Taps", dose: "15/side" },
          { ex: "Chair Dip (bench dip)", dose: "8–10 reps" },
          { ex: "Reverse Crunch", dose: "12 reps" }
        ]
      },
      finisher: ["Wall sit: 20 sec", "Plank: 20 sec"]
    },
    {
      week: 4,
      title: "Strength + Control",
      warmup: ["Week 1 warm-up + 10 slow push-ups (knees or full)"],
      workout: {
        rounds: 5,
        rest: "45 sec between rounds",
        items: [
          { ex: "Push-Up (knees or full)", dose: "10 reps" },
          { ex: "Bodyweight Row / Inverted Row (under table / low bar)", dose: "12 reps" },
          { ex: "Hollow Hold / Hollow Rock", dose: "25 sec" },
          { ex: "Russian Twists", dose: "20 total reps" },
          { ex: "Pike Push-Up (shoulders)", dose: "6–8 reps" },
          { ex: "Lying Bent-Knee Leg Raises", dose: "10 reps" }
        ]
      },
      finisher: ["Mountain climbers: 30 sec", "Plank: 30–45 sec"]
    }
  ]
};

function LinkButton({ link }) {
  const icon = link.type === "video" ? <PlayCircle className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />;
  return (
    <Button asChild variant="secondary" className="w-full justify-between">
      <a href={link.url} target="_blank" rel="noreferrer">
        <span className="flex items-center gap-2">{icon}{link.label}</span>
        <span className="text-xs opacity-70">Open</span>
      </a>
    </Button>
  );
}

function ExerciseCard({ ex }) {
  const yt = ex.links?.find((l) => l.youtubeId);
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-base leading-snug">{ex.name}</CardTitle>
          <div className="flex flex-wrap gap-1 justify-end">
            {ex.tags.slice(0, 4).map((t) => (
              <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>
            ))}
          </div>
        </div>
        {yt ? (
          <a href={yt.url} target="_blank" rel="noreferrer" className="block">
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={ytThumb(yt.youtubeId)}
                alt={`${ex.name} thumbnail`}
                className="w-full h-44 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/25" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium">
                  <PlayCircle className="h-5 w-5" /> Tap to watch
                </div>
              </div>
            </div>
          </a>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-sm font-semibold mb-2">Step-by-step</div>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            {ex.steps.map((s: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, i: React.Key | null | undefined) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold mb-2">Form cues</div>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            {ex.cues.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-semibold">Links</div>
          <div className="grid gap-2">
            {ex.links.map((l, idx) => (
              <LinkButton key={idx} link={l} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function WeekPlan({ week }) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">Week {week.week}: {week.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-sm font-semibold">Warm-up (5 min)</div>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            {week.warmup.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        </div>
        <Separator />
        <div>
          <div className="text-sm font-semibold">Main set</div>
          <div className="text-sm text-muted-foreground mt-1">{week.workout.rounds} rounds • Rest: {week.workout.rest}</div>
          <ul className="mt-2 space-y-2">
            {week.workout.items.map((it, i) => (
              <li key={i} className="flex items-start justify-between gap-3 rounded-xl border p-3">
                <span className="text-sm font-medium leading-snug">{it.ex}</span>
                <Badge variant="secondary" className="shrink-0">{it.dose}</Badge>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold">Optional finisher (3–5 min)</div>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            {week.finisher.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

const STORAGE_KEY = "calisthenics_core_upper_tracker_v1";

function safeJsonParse(str, fallback) {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}

function createBlankDay(templateLength) {
  return { checks: Array.from({ length: templateLength }, () => false), rating: "", notes: "" };
}

function buildDefaultTracker(trackerTemplates) {
  const days = ["Day 1", "Day 2", "Day 3"];
  const out = {};
  Object.keys(trackerTemplates).forEach((wk) => {
    const len = trackerTemplates[wk].length;
    out[wk] = {};
    days.forEach((d) => (out[wk][d] = createBlankDay(len)));
  });
  return out;
}

function reconcileTracker(loaded, trackerTemplates) {
  const base = buildDefaultTracker(trackerTemplates);
  if (!loaded || typeof loaded !== "object") return base;
  for (const wk of Object.keys(base)) {
    if (!loaded[wk]) continue;
    for (const day of Object.keys(base[wk])) {
      const src = loaded[wk][day];
      if (!src) continue;
      const len = trackerTemplates[wk].length;
      const checks = Array.isArray(src.checks) ? src.checks.slice(0, len) : [];
      while (checks.length < len) checks.push(false);
      base[wk][day] = {
        checks,
        rating: typeof src.rating === "string" ? src.rating : "",
        notes: typeof src.notes === "string" ? src.notes : ""
      };
    }
  }
  return base;
}

function TrackerWeek({ weekNumber, template, value, onChange, onResetWeek }) {
  const days = ["Day 1", "Day 2", "Day 3"];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">Week {weekNumber}</div>
        <Button variant="outline" size="sm" onClick={() => onResetWeek(String(weekNumber))} className="rounded-xl">
          <TimerReset className="h-4 w-4 mr-2" /> Reset week
        </Button>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {days.map((day) => (
          <AccordionItem key={day} value={`${weekNumber}-${day}`} className="rounded-2xl border px-3">
            <AccordionTrigger className="text-sm">{day}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pb-3">
                <div className="space-y-3">
                  {template.map((exName, i) => {
                    const checked = Boolean(value?.[day]?.checks?.[i]);
                    return (
                      <div key={i} className="flex items-start gap-3">
                        <Checkbox
                          checked={checked}
                          onCheckedChange={(v) => {
                            const next = structuredClone(value);
                            next[day].checks[i] = Boolean(v);
                            onChange(next);
                          }}
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium">{exName}</div>
                          <div className="text-xs text-muted-foreground">Reps/time: <span className="font-mono">____</span></div>
                        </div>
                        {checked ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : null}
                      </div>
                    );
                  })}
                </div>

                <div className="grid gap-2">
                  <div className="text-sm font-medium">Rating (1–5)</div>
                  <Input
                    inputMode="numeric"
                    placeholder="e.g., 3"
                    value={value?.[day]?.rating ?? ""}
                    onChange={(e) => {
                      const next = structuredClone(value);
                      next[day].rating = e.target.value;
                      onChange(next);
                    }}
                    className="rounded-xl"
                  />
                </div>

                <div className="grid gap-2">
                  <div className="text-sm font-medium">Notes</div>
                  <Input
                    placeholder="What felt easy/hard? Any pain?"
                    value={value?.[day]?.notes ?? ""}
                    onChange={(e) => {
                      const next = structuredClone(value);
                      next[day].notes = e.target.value;
                      onChange(next);
                    }}
                    className="rounded-xl"
                  />
                </div>

                <div className="text-xs text-muted-foreground">
                  Tip: aim to add <b>+1–2 reps</b> or <b>+5 sec</b> each week when form stays clean.
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function WorkoutTimer({ weeks }) {
  const [week, setWeek] = useState(1);
  const [rounds, setRounds] = useState(weeks[0].workout.rounds);
  const [workSec, setWorkSec] = useState(45);
  const [restSec, setRestSec] = useState(30);
  const [roundRestSec, setRoundRestSec] = useState(75);

  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState("work"); // work | rest | roundRest
  const [timeLeft, setTimeLeft] = useState(workSec);
  const [round, setRound] = useState(1);
  const [index, setIndex] = useState(0);

  const tickRef = useRef(null);

  const currentWeek = useMemo(() => weeks.find((w) => w.week === week) ?? weeks[0], [week, weeks]);
  const items = currentWeek.workout.items;

  useEffect(() => {
    // update rounds default when week changes
    setRounds(currentWeek.workout.rounds);
    resetAll(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [week]);

  useEffect(() => {
    setTimeLeft(phase === "work" ? workSec : phase === "rest" ? restSec : roundRestSec);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workSec, restSec, roundRestSec]);

  useEffect(() => {
    if (!running) {
      if (tickRef.current) clearInterval(tickRef.current);
      tickRef.current = null;
      return;
    }

    tickRef.current = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
      tickRef.current = null;
    };
  }, [running]);

  useEffect(() => {
    if (!running) return;
    if (timeLeft > 0) return;

    // Transition when timer hits 0
    if (phase === "work") {
      // after work -> rest, unless it is the last exercise of the round
      const isLastExercise = index === items.length - 1;
      if (isLastExercise) {
        const isLastRound = round === Number(rounds);
        if (isLastRound) {
          setRunning(false);
          setPhase("work");
          setTimeLeft(workSec);
          if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(120);
          return;
        }
        setPhase("roundRest");
        setTimeLeft(roundRestSec);
      } else {
        setPhase("rest");
        setTimeLeft(restSec);
      }
      if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(60);
      return;
    }

    if (phase === "rest") {
      setIndex((i) => Math.min(i + 1, items.length - 1));
      setPhase("work");
      setTimeLeft(workSec);
      if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(40);
      return;
    }

    if (phase === "roundRest") {
      setRound((r) => Math.min(r + 1, Number(rounds)));
      setIndex(0);
      setPhase("work");
      setTimeLeft(workSec);
      if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(80);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, phase, running]);

  function resetAll(stop = true) {
    if (stop) setRunning(false);
    setPhase("work");
    setRound(1);
    setIndex(0);
    setTimeLeft(workSec);
  }

  const title = items[index]?.ex ?? "";
  const dose = items[index]?.dose ?? "";

  const canPrev = !(round === 1 && index === 0 && phase === "work");
  const canNext = !(round === Number(rounds) && index === items.length - 1 && phase === "work");

  function prevStep() {
    // move back one logical step
    setRunning(false);
    if (phase === "rest") {
      setPhase("work");
      setTimeLeft(workSec);
      return;
    }
    if (phase === "roundRest") {
      setPhase("work");
      setTimeLeft(workSec);
      setIndex(items.length - 1);
      return;
    }
    // phase work
    if (index > 0) {
      setIndex(index - 1);
      setPhase("work");
      setTimeLeft(workSec);
    } else if (round > 1) {
      setRound(round - 1);
      setIndex(items.length - 1);
      setPhase("work");
      setTimeLeft(workSec);
    }
  }

  function nextStep() {
    setRunning(false);
    if (phase === "work") {
      // jump to rest / round rest (or finish)
      const isLastExercise = index === items.length - 1;
      const isLastRound = round === Number(rounds);
      if (isLastExercise && isLastRound) {
        resetAll(true);
        return;
      }
      if (isLastExercise) {
        setPhase("roundRest");
        setTimeLeft(roundRestSec);
      } else {
        setPhase("rest");
        setTimeLeft(restSec);
      }
      return;
    }
    if (phase === "rest") {
      setIndex(Math.min(index + 1, items.length - 1));
      setPhase("work");
      setTimeLeft(workSec);
      return;
    }
    if (phase === "roundRest") {
      setRound(Math.min(round + 1, Number(rounds)));
      setIndex(0);
      setPhase("work");
      setTimeLeft(workSec);
    }
  }

  return (
    <div className="space-y-4">
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Workout Timer (interval mode)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            This timer guides you through <b>rounds + exercises</b> using <b>work/rest intervals</b>. Use it for
            rep-based sets by working steadily for the work interval, then resting.
          </p>
          <p className="text-xs">
            Default: 45s work / 30s rest. You can change these below.
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Settings</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Week</div>
              <Input
                inputMode="numeric"
                value={String(week)}
                onChange={(e) => {
                  const v = Math.max(1, Math.min(4, Number(e.target.value || 1)));
                  setWeek(v);
                }}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Rounds</div>
              <Input
                inputMode="numeric"
                value={String(rounds)}
                onChange={(e) => setRounds(Math.max(1, Number(e.target.value || 1)))}
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Work (sec)</div>
              <Input inputMode="numeric" value={String(workSec)} onChange={(e) => setWorkSec(Math.max(10, Number(e.target.value || 45)))} className="rounded-xl" />
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Rest (sec)</div>
              <Input inputMode="numeric" value={String(restSec)} onChange={(e) => setRestSec(Math.max(5, Number(e.target.value || 30)))} className="rounded-xl" />
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Round rest</div>
              <Input inputMode="numeric" value={String(roundRestSec)} onChange={(e) => setRoundRestSec(Math.max(15, Number(e.target.value || 75)))} className="rounded-xl" />
            </div>
          </div>

          <Button variant="outline" className="rounded-xl" onClick={() => resetAll(true)}>
            <RotateCcw className="h-4 w-4 mr-2" /> Reset timer
          </Button>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Now</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs text-muted-foreground">Week {week} • Round {round}/{Number(rounds)}</div>
              <div className="text-lg font-semibold leading-snug">{title}</div>
              <div className="text-sm text-muted-foreground">Target: {dose}</div>
              <div className="mt-1 inline-flex items-center gap-2">
                <Badge variant={phase === "work" ? "default" : "secondary"}>{phase === "work" ? "Work" : phase === "rest" ? "Rest" : "Round Rest"}</Badge>
                <Badge variant="outline">{index + 1}/{items.length}</Badge>
              </div>
            </div>
            <div className="text-3xl font-semibold tabular-nums">{formatTime(Math.max(0, timeLeft))}</div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl flex-1" onClick={prevStep} disabled={!canPrev}>
              <SkipBack className="h-4 w-4 mr-2" /> Prev
            </Button>
            <Button className="rounded-xl flex-1" onClick={() => setRunning((r) => !r)}>
              {running ? <><Pause className="h-4 w-4 mr-2" /> Pause</> : <><Play className="h-4 w-4 mr-2" /> Start</>}
            </Button>
            <Button variant="outline" className="rounded-xl flex-1" onClick={nextStep} disabled={!canNext}>
              Next <SkipForward className="h-4 w-4 ml-2" />
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            Tip: If you prefer rep-based pacing, keep a steady tempo for the work interval (e.g., 6–12 reps).
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function MobileCalisthenicsPage() {
  const [query, setQuery] = useState("");

  const trackerTemplates = useMemo(
    () => ({
      1: ["Incline Push-Ups", "Dead Bug", "Negative Push-Ups", "Plank", "Rows", "Glute Bridge"],
      2: ["Incline Push-Ups", "Rows", "Knee-to-elbow plank (optional)", "Hollow Hold", "Negative Push-Ups", "Superman"],
      3: ["Push-Ups", "Rows", "Hollow Rocks", "Shoulder Taps", "Chair Dips", "Reverse Crunch"],
      4: ["Push-Ups", "Rows", "Hollow Hold", "Russian Twists", "Pike Push-Ups", "Bent-knee leg raises"]
    }),
    []
  );

  // Persistent tracker (localStorage)
  const [tracker, setTracker] = useState(() => buildDefaultTracker(trackerTemplates));

  useEffect(() => {
    if (typeof window === "undefined") return;
    const loaded = safeJsonParse(window.localStorage.getItem(STORAGE_KEY), null);
    setTracker(reconcileTracker(loaded, trackerTemplates));
  }, [trackerTemplates]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tracker));
    } catch {
      // ignore storage errors
    }
  }, [tracker]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return EXERCISES;
    return EXERCISES.filter((e) => e.name.toLowerCase().includes(q) || e.tags.some((t) => t.toLowerCase().includes(q)));
  }, [query]);

  const resetWeek = (wk) => {
    setTracker((prev) => {
      const next = structuredClone(prev);
      const len = trackerTemplates[wk].length;
      ["Day 1", "Day 2", "Day 3"].forEach((d) => (next[wk][d] = createBlankDay(len)));
      return next;
    });
  };

  const resetAllTracker = () => {
    setTracker(buildDefaultTracker(trackerTemplates));
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto max-w-md px-4 pb-24 pt-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">1‑Month Beginner Calisthenics</h1>
          <p className="text-sm text-muted-foreground">Core + Upper Body Strength • Mobile plan, demos, tracker + timer.</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">3 days/week</Badge>
            <Badge variant="secondary">30–40 min</Badge>
            <Badge variant="secondary">Beginner</Badge>
            <Badge variant="secondary">Offline tracker</Badge>
          </div>
        </header>

        <Tabs defaultValue="plan" className="mt-6">
          <TabsList className="grid grid-cols-4 rounded-2xl">
            <TabsTrigger value="plan" className="rounded-2xl">Plan</TabsTrigger>
            <TabsTrigger value="exercises" className="rounded-2xl">Exercises</TabsTrigger>
            <TabsTrigger value="tracker" className="rounded-2xl">Tracker</TabsTrigger>
            <TabsTrigger value="timer" className="rounded-2xl">Timer</TabsTrigger>
          </TabsList>

          <TabsContent value="plan" className="mt-4 space-y-4">
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">How to use this program</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div><b>Schedule:</b> {PLAN.overview.rest}</div>
                <div><b>Session length:</b> {PLAN.overview.sessionLength}</div>
                <div><b>Goal:</b> {PLAN.overview.focus}</div>
                <ul className="list-disc pl-5 space-y-1">
                  {PLAN.overview.rules.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {PLAN.weeks.map((w) => (
                <WeekPlan key={w.week} week={w} />
              ))}
            </div>

            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Progression (simple)</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <ul className="list-disc pl-5 space-y-1">
                  <li>If reps feel easy, add <b>+1–2 reps</b> next session.</li>
                  <li>If holds feel easy, add <b>+5 sec</b> next session.</li>
                  <li>If form breaks, scale: higher incline, fewer reps, or shorter holds.</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exercises" className="mt-4 space-y-4">
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Exercise library</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search (e.g., plank, pull, core)" className="pl-9 rounded-2xl" />
                </div>
                <div className="text-xs text-muted-foreground">Tip: tap a thumbnail to open the demo video.</div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {filtered.map((ex) => (
                <ExerciseCard key={ex.id} ex={ex} />
              ))}
              {filtered.length === 0 ? (
                <Card className="rounded-2xl shadow-sm">
                  <CardContent className="py-8 text-center text-sm text-muted-foreground">No exercises match your search.</CardContent>
                </Card>
              ) : null}
            </div>
          </TabsContent>

          <TabsContent value="tracker" className="mt-4 space-y-4">
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Mobile Tracker (saved on your device)</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>✅ Checkboxes + rating + notes.</p>
                <p>✅ Automatically saved (even if you close the page).</p>
                <p className="text-xs">Saved locally using your browser storage (localStorage).</p>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {[1, 2, 3, 4].map((wk) => (
                <TrackerWeek
                  key={wk}
                  weekNumber={wk}
                  template={trackerTemplates[wk]}
                  value={tracker[String(wk)]}
                  onChange={(nextWeek) => setTracker((prev) => ({ ...prev, [String(wk)]: nextWeek }))}
                  onResetWeek={resetWeek}
                />
              ))}
            </div>

            <div className="grid gap-2">
              <Button variant="outline" className="rounded-xl" onClick={resetAllTracker}>
                <TimerReset className="h-4 w-4 mr-2" /> Clear all tracker data
              </Button>
            </div>

            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">End-of-month check-in</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="grid gap-2">
                  <div className="font-medium">Tests</div>
                  <div className="text-muted-foreground">Max push-ups: <span className="font-mono">____</span></div>
                  <div className="text-muted-foreground">Plank hold: <span className="font-mono">____ sec</span></div>
                  <div className="text-muted-foreground">Rows max reps: <span className="font-mono">____</span></div>
                  <div className="text-muted-foreground">Hollow hold: <span className="font-mono">____ sec</span></div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timer" className="mt-4">
            <WorkoutTimer weeks={PLAN.weeks} />
          </TabsContent>
        </Tabs>

        <footer className="mt-10 text-xs text-muted-foreground leading-relaxed">
          <div className="font-medium mb-1">Notes</div>
          <ul className="list-disc pl-5 space-y-1">
            <li>The tracker saves locally on your device (localStorage). Use “Clear all tracker data” to remove it.</li>
            <li>Timer is interval-based (best for rep-based sets when you don’t want to watch the clock).</li>
          </ul>
        </footer>
      </div>
    </div>
  );
}

