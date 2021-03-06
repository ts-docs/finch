
const Finch = require("../");
const Handlebars = require("handlebars");
const Eta = require("eta");
const Benchmark = require("benchmark");

const Rendering = new Benchmark.Suite("Rendering");

Rendering.add("Parsing: Finch - simple template", () => {
    Finch.addTemplate("test", `
        <div>
        {{name}}
        {{#if age > 18}}
            <p>User is over 18</p>
        {{/#else}}
            <p>User is under 18</p>
        {{/}}
        </div>
    `);
})

.add("Parsing: Handlebars - simple template", () => {
    Handlebars.compile("test", `
        <div>
        {{name}}
        {{#if isOver18}}
            <p>User is over 18</p>
        {{else}}
            <p>User is under 18</p>
        {{/if}}
        </div>
    `);
})

.add("Parsing: Ejs - simple template", () => {
    Eta.compile("test", `
        <div>
        <%= user.name %>
        <% if (name.age > 18) { %>
            <p>User is over 18</p>
        <% } else { %>
            <p>User is under 18</p>
        <% } %>
        </div>
    `);
})

.on('cycle', function(event) {
    console.log(String(event.target));
})

.on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })

.run();

Finch.addTemplate("test_1", `
<div>
{{user.name}}
{{#if user.age > 18}}
    <p>User is over 18</p>
{{/#else}}
    <p>User is under 18</p>
{{/}}
</div>
`);

const testhb = Handlebars.compile(`
<div>
{{user.name}}
{{#if user.isOverage}}
    <p>User is over 18</p>
{{else}}
    <p>User is under 18</p>
{{/if}}
</div>
`);

const testejs = Eta.compile(`
<div>
<%= it.user.name %>
<% if (it.user.age > 18) { %>
    <p>User is over 18</p>
<% } else { %>
    <p>User is under 18</p>
<% } %>
</div>
`);

const Compilation = new Benchmark.Suite("Compilation");

Compilation.add("Compilation: Finch", () => {
    Finch.compile("test_1", {
        user: {
        name: "Google",
        age: 19
    }
    });
})

.add("Compilation: Handlebars", () => {
    testhb({
        user: {
        name: "Google",
        isOverage: true
        }
    })
})

.add("Compilation: Eta", () => {
    testejs({
        user: {
            name: "Google",
            age: 19
        }
    }, Eta.getConfig());
})

.on('cycle', function(event) {
    console.log(String(event.target));
})

.on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
})

.run();