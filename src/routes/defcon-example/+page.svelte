<script lang="ts">
  import { MultiSwitch } from "$lib";
  import ShowcaseSection from "../ShowcaseSection.svelte";

  // DEFCON levels data with descriptions and styling
  const defconLevels = [
    {
      level: 5,
      name: "DEFCON 5",
      title: "Exercise",
      description:
        "Lowest state of readiness. Normal peacetime conditions with regular training exercises.",
      color: { backgroundColor: "#22c55e", thumbColor: "#16a34a", thumbBorderColor: "#15803d" }, // Green
      severity: "Low",
    },
    {
      level: 4,
      name: "DEFCON 4",
      title: "Increased Watch",
      description:
        "Increased intelligence watch and strengthened security measures. Above normal readiness.",
      color: { backgroundColor: "#3b82f6", thumbColor: "#2563eb", thumbBorderColor: "#1e40af" }, // Blue
      severity: "Guarded",
    },
    {
      level: 3,
      name: "DEFCON 3",
      title: "Round House",
      description:
        "Increase in force readiness above normal readiness. Air Force ready to mobilize in 15 minutes.",
      color: { backgroundColor: "#eab308", thumbColor: "#ca8a04", thumbBorderColor: "#a16207" }, // Yellow
      severity: "Elevated",
    },
    {
      level: 2,
      name: "DEFCON 2",
      title: "Fast Pace",
      description:
        "Next step to nuclear war. Armed forces ready to deploy and engage in less than 6 hours.",
      color: { backgroundColor: "#f97316", thumbColor: "#ea580c", thumbBorderColor: "#c2410c" }, // Orange
      severity: "High",
    },
    {
      level: 1,
      name: "DEFCON 1",
      title: "Exercise Term",
      description:
        "Maximum readiness. Nuclear war is imminent or has already begun. Maximum force readiness.",
      color: { backgroundColor: "#ef4444", thumbColor: "#dc2626", thumbBorderColor: "#b91c1c" }, // Red
      severity: "Severe",
    },
  ];

  let selectedLevel = $state(2); // Start at DEFCON 3

  // Create item styles array for the MultiSwitch
  const itemStyles = defconLevels.map((level) => level.color);

  console.log("done");
</script>

<div class="row">
  <div class="col-12">
    <h1 class="display-5">🚨 DEFCON Levels Example</h1>
    <p class="lead">
      Interactive demonstration of Defense Condition (DEFCON) readiness levels
      using vertical MultiSwitch with tooltips.
    </p>
  </div>
</div>

<ShowcaseSection
  title="🎯 DEFCON Alert System"
  subtitle="Vertical switch showing military defense readiness levels from peaceful exercises to maximum alert"
>
  {#snippet demo()}
    <div class="d-flex flex-column align-items-center">
      <div class="defcon-container position-relative">
        <MultiSwitch
          bind:selectedIndex={selectedLevel}
          items={defconLevels}
          orientation="vertical"
          size={80}
          {itemStyles}
        >
          {#snippet children({ currentIndex, item, isSelected })}
            <div class="defcon-level-display text-center" title={item.description}>
              {item.level}
            </div>
          {/snippet}
        </MultiSwitch>
      </div>
    </div>
  {/snippet}

  {#snippet controls()}
    <div class="form-group mb-3">
      <label class="form-label">DEFCON Level</label>
      <select class="form-select" bind:value={selectedLevel}>
        {#each defconLevels as level, index}
          <option value={index}>{level.name} - {level.title}</option>
        {/each}
      </select>
    </div>

    <div class="alert alert-sm" style:background-color={defconLevels[selectedLevel].color.backgroundColor + '20'} style:border-color={defconLevels[selectedLevel].color.backgroundColor}>
      <strong>Current Level:</strong> {defconLevels[selectedLevel].name}
      <br>
      <small>{defconLevels[selectedLevel].title}</small>
    </div>
  {/snippet}

  {#snippet description()}
    <div class="current-level-info">
      <div
        class="status-card"
        style:border-left-color={defconLevels[selectedLevel].color
          .backgroundColor}
      >
        <h4
          class="status-level"
          style:color={defconLevels[selectedLevel].color.backgroundColor}
        >
          {defconLevels[selectedLevel].name}
        </h4>
        <h6 class="status-title text-muted">
          {defconLevels[selectedLevel].title}
        </h6>
        <p class="status-description">
          {defconLevels[selectedLevel].description}
        </p>
        <div class="status-metadata">
          <span
            class="badge"
            style:background-color={defconLevels[selectedLevel].color
              .backgroundColor}
          >
            {defconLevels[selectedLevel].severity} Alert
          </span>
        </div>
      </div>
    </div>

    <h6 class="mt-3">Features Demonstrated</h6>
    <ul class="feature-list">
      <li><strong>Items Array:</strong> DEFCON levels as data objects</li>
      <li><strong>Vertical Orientation:</strong> Military-style vertical display</li>
      <li><strong>Custom Styling:</strong> Color-coded severity levels</li>
      <li><strong>Interactive Tooltips:</strong> Hover for detailed descriptions</li>
      <li><strong>Children Snippet:</strong> Custom rendering with level data</li>
    </ul>
  {/snippet}
</ShowcaseSection>

<ShowcaseSection
  title="📊 DEFCON System Overview"
  subtitle="Complete breakdown of all defense readiness conditions"
>
  {#snippet demo()}
    <div class="table-responsive">
      <table class="table table-hover">
        <thead class="table-dark">
          <tr>
            <th>Level</th>
            <th>Name</th>
            <th>Exercise Term</th>
            <th>Severity</th>
          </tr>
        </thead>
        <tbody>
          {#each defconLevels as level, index}
            <tr class:table-active={selectedLevel === index}>
              <td>
                <span
                  class="level-badge"
                  style:background-color={level.color.backgroundColor}
                >
                  {level.level}
                </span>
              </td>
              <td><strong>{level.name}</strong></td>
              <td><em>{level.title}</em></td>
              <td>
                <span
                  class="severity-badge"
                  style:background-color={level.color.backgroundColor}
                >
                  {level.severity}
                </span>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/snippet}

  {#snippet controls()}
    <div class="form-group mb-3">
      <label class="form-label">Highlight Level</label>
      <select class="form-select" bind:value={selectedLevel}>
        {#each defconLevels as level, index}
          <option value={index}>{level.name}</option>
        {/each}
      </select>
      <small class="form-text text-muted">Select a level to highlight in the table</small>
    </div>
  {/snippet}

  {#snippet description()}
    <h6>Current Selection</h6>
    <div class="selected-info p-3 border rounded" style:background-color={defconLevels[selectedLevel].color.backgroundColor + '10'}>
      <h6>{defconLevels[selectedLevel].name} - {defconLevels[selectedLevel].title}</h6>
      <p class="mb-2">{defconLevels[selectedLevel].description}</p>
      <span class="badge" style:background-color={defconLevels[selectedLevel].color.backgroundColor}>
        {defconLevels[selectedLevel].severity} Alert
      </span>
    </div>

    <h6 class="mt-3">About DEFCON Levels</h6>
    <p>The Defense Readiness Condition (DEFCON) is an alert state used by the United States Armed Forces. Higher numbers indicate lower states of alert.</p>
    <ul>
      <li><strong>DEFCON 5:</strong> Normal peacetime conditions</li>
      <li><strong>DEFCON 1:</strong> Maximum military readiness</li>
    </ul>
  {/snippet}
</ShowcaseSection>

<style>
  .defcon-container {
    min-height: 400px;
    padding: 20px;
  }

  .defcon-level-display {
    font-weight: bold;
    font-size: 1.5rem;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }



  .current-level-info {
    padding-left: 20px;
  }

  .status-card {
    border-left: 4px solid;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 0 8px 8px 0;
  }

  .status-level {
    font-weight: 900;
    margin-bottom: 8px;
  }

  .status-title {
    margin-bottom: 12px;
    font-style: italic;
  }

  .status-description {
    line-height: 1.6;
    margin-bottom: 16px;
  }

  .level-badge,
  .severity-badge {
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 0.85rem;
  }

  .badge {
    color: white !important;
  }

  .feature-list {
    font-size: 0.9rem;
    line-height: 1.6;
  }

  .feature-list li {
    margin-bottom: 0.5rem;
  }

  .selected-info h6 {
    margin-bottom: 0.5rem;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .defcon-tooltip {
      position: static;
      width: auto;
      margin-top: 20px;
    }

    .tooltip-trigger {
      position: static;
      display: block;
      text-align: center;
      margin-bottom: 10px;
    }

    .tooltip-content {
      position: static;
      opacity: 1;
      visibility: visible;
      margin-left: 0;
    }
  }
</style>
