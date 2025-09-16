<script lang="ts">
</script>

<div class="row">
  <div class="col-12">
    <h1 class="display-5">⚡ External Updates</h1>
    <p class="lead">
      Use the unified <code>update()</code> method to programmatically control switch
      components from vanilla HTML/JavaScript environments.
    </p>
  </div>
</div>

<div class="row mb-5">
  <div class="col-12">
    <h2>🔄 Update Method Overview</h2>
    <p class="text-muted">
      Both Switch and MultiSwitch components expose an update() method for
      external property updates
    </p>
  </div>
</div>

<div class="row mb-5">
  <div class="col-12">
    <div class="alert alert-info">
      <h6 class="alert-heading">📝 When to Use External Updates</h6>
      <p class="mb-2">
        The <code>update()</code> method is designed for scenarios where:
      </p>
      <ul class="mb-0">
        <li>
          You're using the components from vanilla HTML/JavaScript (not
          Svelte-to-Svelte)
        </li>
        <li>You need to programmatically update multiple properties at once</li>
        <li>You're integrating with other frameworks or libraries</li>
        <li>
          You want to avoid Svelte 5 reactivity issues in mixed environments
        </li>
      </ul>
    </div>

    <div class="row mt-4">
      <div class="col-md-6">
        <h6>Switch Component</h6>
        <pre class="bg-dark text-light p-3 rounded"><code
            >// Get component reference from DOM
const switchElement = document.querySelector('#my-switch');

// Update multiple properties at once
switchElement.update({"{"}
	checked: true,
	size: 80,
	isDisabled: false,
	orientation: 'vertical'
{"}"});</code
          ></pre>
      </div>
      <div class="col-md-6">
        <h6>MultiSwitch Component</h6>
        <pre class="bg-dark text-light p-3 rounded"><code
            >// Get component reference from DOM
const multiElement = document.querySelector('#my-multiswitch');

// Update multiple properties at once
multiElement.update({"{"}
	selectedIndex: 2,
	size: 70,
	itemsCount: 5,
	itemStyles: [/* style objects */],
	isDisabled: true,
	orientation: 'horizontal'
{"}"});</code
          ></pre>
      </div>
    </div>
  </div>
</div>

<div class="row mb-5">
  <div class="col-12">
    <h2>📝 Complete HTML Example</h2>
    <p class="text-muted">
      Full HTML page example showing how to use Svelte Switch components from
      vanilla JavaScript
    </p>
  </div>
</div>

<div class="row mb-5">
  <div class="col-12">
    <pre class="bg-dark text-light p-3 rounded"><code
        >&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Svelte Switch from JavaScript&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;My App with Svelte Switches&lt;/h1&gt;

    &lt;!-- Switch components with IDs for JavaScript access --&gt;
    &lt;div id="my-switch"&gt;&lt;/div&gt;
    &lt;div id="my-multiswitch"&gt;&lt;/div&gt;

    &lt;!-- Control buttons --&gt;
    &lt;button onclick="toggleSwitch()"&gt;Toggle Switch&lt;/button&gt;
    &lt;button onclick="changeMultiStep()"&gt;Change Multi Step&lt;/button&gt;

    &lt;script&gt;
        // Get references to the components
        const switchElement = document.querySelector('#my-switch');
        const multiElement = document.querySelector('#my-multiswitch');

        // Function to toggle the switch
        function toggleSwitch() {"{"}
            switchElement.update({"{"}
                checked: Math.random() &gt; 0.5,
                size: Math.floor(Math.random() * 50) + 30,
                orientation: Math.random() &gt; 0.5 ? 'horizontal' : 'vertical'
            {"}"});
        {"}"}

        // Function to change multi-switch step
        function changeMultiStep() {"{"}
            multiElement.update({"{"}
                selectedIndex: Math.floor(Math.random() * 4),
                size: Math.floor(Math.random() * 40) + 40,
                itemsCount: 4,
                itemStyles: [
                    {"{"} backgroundColor: '#ef4444', thumbColor: '#dc2626' {"}"},
                    {"{"} backgroundColor: '#f97316', thumbColor: '#ea580c' {"}"},
                    {"{"} backgroundColor: '#eab308', thumbColor: '#ca8a04' {"}"},
                    {"{"} backgroundColor: '#22c55e', thumbColor: '#16a34a' {"}"}
                ]
            {"}"});
        {"}"}
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code
      ></pre>
  </div>
</div>

<div class="row mb-5">
  <div class="col-12">
    <h2>📋 Available Properties</h2>
    <p class="text-muted">
      Complete list of properties that can be updated externally
    </p>
  </div>
</div>

<div class="row mb-5">
  <div class="col-md-6">
    <div class="card">
      <div class="card-header">
        <h6 class="mb-0">🔘 Switch Properties</h6>
      </div>
      <div class="card-body">
        <table class="table table-sm">
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>checked</code></td>
              <td>boolean</td>
              <td>Switch state</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td>number</td>
              <td>Component size in pixels</td>
            </tr>
            <tr>
              <td><code>isDisabled</code></td>
              <td>boolean</td>
              <td>Disabled state</td>
            </tr>
            <tr>
              <td><code>orientation</code></td>
              <td>string</td>
              <td>'horizontal' | 'vertical'</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div class="col-md-6">
    <div class="card">
      <div class="card-header">
        <h6 class="mb-0">🎚️ MultiSwitch Properties</h6>
      </div>
      <div class="card-body">
        <table class="table table-sm">
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>selectedIndex</code></td>
              <td>number</td>
              <td>Current step index</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td>number</td>
              <td>Component size in pixels</td>
            </tr>
            <tr>
              <td><code>itemsCount</code></td>
              <td>number</td>
              <td>Number of items/steps</td>
            </tr>
            <tr>
              <td><code>itemStyles</code></td>
              <td>array</td>
              <td>Style objects for each item</td>
            </tr>
            <tr>
              <td><code>isDisabled</code></td>
              <td>boolean</td>
              <td>Disabled state</td>
            </tr>
            <tr>
              <td><code>orientation</code></td>
              <td>string</td>
              <td>'horizontal' | 'vertical'</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<div class="row mb-5">
  <div class="col-12">
    <h2>⚠️ Important Notes</h2>
    <p class="text-muted">
      Best practices and considerations for using external updates
    </p>
  </div>
</div>

<div class="row mb-5">
  <div class="col-12">
    <div class="alert alert-warning">
      <h6 class="alert-heading">📖 Usage Guidelines</h6>
      <ul class="mb-0">
        <li>
          <strong>Svelte-to-Svelte Usage:</strong> When using components within Svelte
          applications, prefer reactive statements and bind: directives over the
          update() method
        </li>
        <li>
          <strong>External Integration:</strong> The update() method is specifically
          designed for vanilla JavaScript, HTML, or other framework integrations
        </li>
        <li>
          <strong>Reactivity:</strong> The update() method triggers internal reactivity,
          ensuring UI updates reflect the new property values
        </li>
        <li>
          <strong>Type Safety:</strong> All update() parameters are fully typed when
          used with TypeScript
        </li>
      </ul>
    </div>
  </div>
</div>

<style>
  code {
    color: #e83e8c;
    font-size: 0.875em;
  }

  pre code {
    color: #ffffff;
    font-size: 0.8rem;
  }

  .table th {
    border-top: none;
    font-weight: 600;
    font-size: 0.85rem;
  }

  .table td {
    font-size: 0.85rem;
    vertical-align: middle;
  }
</style>
