<script lang="ts">
  import { Switch, MultiSwitch } from '$lib';

  // Development testing variables
  let checked = $state(false);
  let selectedIndex = $state(0);
  let size = $state(50);
  let orientation: 'horizontal' | 'vertical' = $state('horizontal');
  let shouldDisplayLabels = $state(true);
  let labelPosition: 'top' | 'bottom' | 'left' | 'right' = $state('right');

  const testItems = ['Option A', 'Option B', 'Option C', 'Option D'];
</script>

<div class="container py-4">
  <h1>🔄 Development Testing</h1>
  <p class="text-muted">Quick testing area for Switch components during development</p>

  <div class="row">
    <div class="col-lg-6">
      <div class="card mb-4">
        <div class="card-header">
          <h5 class="mb-0">Binary Switch</h5>
        </div>
        <div class="card-body">
          <div class="text-center py-4">
            <Switch
              bind:checked
              {size}
              {orientation}
            >
              {#snippet children({ isSelected })}
                <span>{isSelected ? '✓' : '✗'}</span>
              {/snippet}
            </Switch>
          </div>
          <div class="form-group mb-3">
            <label class="form-label">Checked: {checked}</label>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" bind:checked>
              <label class="form-check-label">Toggle state</label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-6">
      <div class="card mb-4">
        <div class="card-header">
          <h5 class="mb-0">MultiSwitch with Default Labels</h5>
        </div>
        <div class="card-body">
          <div class="text-center py-4">
            <MultiSwitch
              bind:selectedIndex
              items={testItems}
              {size}
              {orientation}
              {shouldDisplayLabels}
              {labelPosition}
            />
          </div>
          <div class="form-group mb-3">
            <label class="form-label">Selected: {selectedIndex} ({testItems[selectedIndex]})</label>
            <select class="form-select" bind:value={selectedIndex}>
              {#each testItems as item, i}
                <option value={i}>{item}</option>
              {/each}
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <h5 class="mb-0">Controls</h5>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-3">
          <div class="form-group mb-3">
            <label class="form-label">Size: {size}px</label>
            <input
              type="range"
              class="form-range"
              min="30"
              max="120"
              bind:value={size}
            >
          </div>
        </div>

        <div class="col-md-3">
          <div class="form-group mb-3">
            <label class="form-label">Orientation</label>
            <select class="form-select" bind:value={orientation}>
              <option value="horizontal">Horizontal</option>
              <option value="vertical">Vertical</option>
            </select>
          </div>
        </div>

        <div class="col-md-3">
          <div class="form-group mb-3">
            <label class="form-label">Show Labels</label>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" bind:checked={shouldDisplayLabels}>
              <label class="form-check-label">Display labels</label>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="form-group mb-3">
            <label class="form-label">Label Position</label>
            <select class="form-select" bind:value={labelPosition}>
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>