<script lang="ts">
  import { MultiSwitch } from "$lib/index.js";
  import ShowcaseSection from "../ShowcaseSection.svelte";

  let selectedDay = 0;
  let selectedMonth = 0;
  let selectedPriority = 0;
  let selectedSpeed = 1;
  let horizontalDay = 2;
  let horizontalMonth = 5;
  let horizontalPriority = 1;
  let horizontalSpeed = 2;

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const priorities = [
    { name: 'Low', color: '#10b981' },
    { name: 'Medium', color: '#f59e0b' },
    { name: 'High', color: '#ef4444' },
    { name: 'Critical', color: '#7c3aed' }
  ];
  const speeds = ['Slow', 'Normal', 'Fast', 'Turbo'];
</script>

<div class="row">
  <div class="col-12">
    <h1>🏷️ MultiSwitch with Labels</h1>
    <p class="lead">
      Enhance your MultiSwitch components with labels for better user experience.
      In vertical orientation, all labels are displayed. In horizontal orientation, only the current selection's label is shown.
    </p>
  </div>
</div>

<ShowcaseSection
  title="Vertical Labels - Days of Week"
  subtitle="All labels visible in vertical orientation">
  {#snippet demo()}
    <div class="d-flex justify-content-center align-items-center h-100">
      <MultiSwitch
        bind:selectedIndex={selectedDay}
        items={daysOfWeek}
        orientation="vertical"
        shouldDisplayLabels={true}
        size={50}
      >
        {#snippet label({ currentIndex, item })}
          <span style="min-width: 40px; margin-left: 10px;">
            {item}
          </span>
        {/snippet}
      </MultiSwitch>
    </div>
  {/snippet}

  {#snippet controls()}
    <div class="form-group">
      <label for="day-select">Selected Day</label>
      <select id="day-select" class="form-control" bind:value={selectedDay}>
        {#each daysOfWeek as day, i}
          <option value={i}>{day}</option>
        {/each}
      </select>
    </div>
  {/snippet}

  {#snippet description()}
    <p>
      When using vertical orientation with <code>shouldDisplayLabels={true}</code>,
      all item labels are displayed to the right of the switch.
    </p>
    <h6>Features:</h6>
    <ul>
      <li>Each item gets its own persistent label</li>
      <li>Active label is highlighted with bold text</li>
      <li>Labels fade slightly when not selected</li>
    </ul>
  {/snippet}
</ShowcaseSection>

<ShowcaseSection
  title="Vertical Labels with Custom Styling"
  subtitle="Months selector with themed colors">
  {#snippet demo()}
    <div class="d-flex justify-content-center align-items-center h-100">
      <MultiSwitch
        bind:selectedIndex={selectedMonth}
        items={months}
        orientation="vertical"
        shouldDisplayLabels={true}
        size={40}
        itemStyles={{
          backgroundColor: '#3b82f6',
          thumbColor: '#fff',
          thumbBorderColor: '#2563eb'
        }}
      >
        {#snippet label({ currentIndex, item, isSelected })}
          <span style="min-width: 40px; margin-left: 10px; color: {isSelected ? '#3b82f6' : '#6b7280'};">
            {item}
          </span>
        {/snippet}
      </MultiSwitch>
    </div>
  {/snippet}

  {#snippet controls()}
    <div class="form-group">
      <label for="month-select">Selected Month</label>
      <select id="month-select" class="form-control" bind:value={selectedMonth}>
        {#each months as month, i}
          <option value={i}>{month}</option>
        {/each}
      </select>
    </div>
    <div class="form-group">
      <span class="badge bg-info">Current: {months[selectedMonth]}</span>
    </div>
  {/snippet}

  {#snippet description()}
    <p>
      Labels can be styled dynamically based on selection state.
      The <code>isSelected</code> parameter allows conditional styling.
    </p>
    <h6>Customizations:</h6>
    <ul>
      <li>Dynamic color based on selection</li>
      <li>Custom itemStyles for theming</li>
      <li>Smaller size (40px) for compact display</li>
    </ul>
  {/snippet}
</ShowcaseSection>

<ShowcaseSection
  title="Horizontal Labels - Position Bottom"
  subtitle="Single label below the switch that updates with selection">
  {#snippet demo()}
    <div class="d-flex justify-content-center align-items-center h-100">
      <MultiSwitch
        bind:selectedIndex={horizontalDay}
        items={daysOfWeek}
        orientation="horizontal"
        shouldDisplayLabels={true}
        labelPosition="bottom"
        size={50}
      >
        {#snippet label({ item })}
          <span style="font-weight: bold; color: #3b82f6;">{item}</span>
        {/snippet}
      </MultiSwitch>
    </div>
  {/snippet}

  {#snippet controls()}
    <div class="form-group">
      <label for="h-day-select">Selected Day</label>
      <select id="h-day-select" class="form-control" bind:value={horizontalDay}>
        {#each daysOfWeek as day, i}
          <option value={i}>{day}</option>
        {/each}
      </select>
    </div>
  {/snippet}

  {#snippet description()}
    <p>
      In horizontal mode with <code>labelPosition="bottom"</code>,
      only the current selection's label is displayed below the switch.
    </p>
    <h6>Key Differences from Vertical:</h6>
    <ul>
      <li>Only one label shown (current selection)</li>
      <li>Label updates as selection changes</li>
      <li>Position configurable: top, bottom, left, right</li>
    </ul>
  {/snippet}
</ShowcaseSection>

<ShowcaseSection
  title="Horizontal Labels - Position Top"
  subtitle="Label displayed above the switch">
  {#snippet demo()}
    <div class="d-flex justify-content-center align-items-center h-100">
      <MultiSwitch
        bind:selectedIndex={horizontalMonth}
        items={months}
        orientation="horizontal"
        shouldDisplayLabels={true}
        labelPosition="top"
        size={45}
        itemStyles={{
          backgroundColor: '#10b981',
          thumbColor: '#fff'
        }}
      >
        {#snippet label({ item, currentIndex })}
          <span style="color: #10b981; font-size: 18px;">
            {currentIndex + 1}. {item}
          </span>
        {/snippet}
      </MultiSwitch>
    </div>
  {/snippet}

  {#snippet controls()}
    <div class="form-group">
      <label for="h-month-select">Selected Month</label>
      <select id="h-month-select" class="form-control" bind:value={horizontalMonth}>
        {#each months as month, i}
          <option value={i}>{month}</option>
        {/each}
      </select>
    </div>
  {/snippet}

  {#snippet description()}
    <p>
      With <code>labelPosition="top"</code>, the label appears above the switch.
      Labels can include dynamic content like indices.
    </p>
    <h6>Label Content:</h6>
    <ul>
      <li>Access to currentIndex parameter</li>
      <li>Access to item data</li>
      <li>Can include custom formatting</li>
    </ul>
  {/snippet}
</ShowcaseSection>

<ShowcaseSection
  title="Horizontal Labels - Left & Right Positions"
  subtitle="Labels on the sides of the switch">
  {#snippet demo()}
    <div class="d-flex justify-content-around align-items-center h-100 flex-wrap gap-4">
      <div class="text-center">
        <h6 class="mb-3">Left Position</h6>
        <MultiSwitch
          bind:selectedIndex={horizontalPriority}
          items={priorities}
          orientation="horizontal"
          shouldDisplayLabels={true}
          labelPosition="left"
          size={50}
          itemStyles={priorities.map(p => ({
            backgroundColor: p.color,
            thumbColor: '#fff'
          }))}
        >
          {#snippet label({ item })}
            <span style="color: {item.color}; font-weight: bold;">
              {item.name}
            </span>
          {/snippet}
        </MultiSwitch>
      </div>

      <div class="text-center">
        <h6 class="mb-3">Right Position</h6>
        <MultiSwitch
          bind:selectedIndex={horizontalSpeed}
          items={speeds}
          orientation="horizontal"
          shouldDisplayLabels={true}
          labelPosition="right"
          size={50}
        >
          {#snippet children({ currentIndex })}
            <span style="font-size: 20px;">
              {#if currentIndex === 0}🐢
              {:else if currentIndex === 1}🚶
              {:else if currentIndex === 2}🏃
              {:else}🚀
              {/if}
            </span>
          {/snippet}
          {#snippet label({ item })}
            <span style="font-weight: bold;">
              {item} Mode
            </span>
          {/snippet}
        </MultiSwitch>
      </div>
    </div>
  {/snippet}

  {#snippet controls()}
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label for="h-priority">Priority</label>
          <select id="h-priority" class="form-control" bind:value={horizontalPriority}>
            {#each priorities as priority, i}
              <option value={i}>{priority.name}</option>
            {/each}
          </select>
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label for="h-speed">Speed</label>
          <select id="h-speed" class="form-control" bind:value={horizontalSpeed}>
            {#each speeds as speed, i}
              <option value={i}>{speed}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>
  {/snippet}

  {#snippet description()}
    <p>
      Side positioning (<code>left</code> or <code>right</code>) is perfect for
      inline layouts where vertical space is limited.
    </p>
    <h6>Use Cases:</h6>
    <ul>
      <li>Inline form controls</li>
      <li>Toolbar settings</li>
      <li>Compact UI layouts</li>
    </ul>
  {/snippet}
</ShowcaseSection>

