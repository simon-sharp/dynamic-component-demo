An Angular package that allows to load components into a component at runtime. This is useful for creating pages
that are defined by server configuration.

### Breaking change with version 2:

Rename all usages of <sso-dynamic> to <sso-dynamic-module-component>

Its solved with 2.1.0 because we let <sso-dynamic> solve the issue depending of whether module is defined.

### Usage:

Inside your components HTML

```
<sso-dynamic [dynamicComponent]="anInstanceOfDynamicComponent"></sso-dynamic>

or

<sso-dynamic-component [dynamicComponent]="anInstanceOfDynamicComponent"></sso-dynamic-component>

or

<sso-dynamic-module-component [dynamicComponent]="anInstanceOfDynamicComponent"></sso-dynamic-module-component>
```

The difference between sso-dynamic-component and sso-dynamic-module-component is that with

> sso-dynamic-component you only define a component

while with

> sso-dynamic-module-component you can name a module name and a component name.

Whats the Difference?

sso-dynamic-component defines the module the components reside in in the imports of the module the component is
dynamically loaded while with sso-dynamic-module-component you name it in the DynamicComponent class.
When using sso-dynamic-module-component the Angular Renderer must be active.
This adds approximately 500kb additional load to the load time of the angular application.
So in the end its a trade-off of what is smaller. Usually I recommend the usage of sso-dynamic-component.
sso-dynamic-module-component might also have to be used if there are several components with the same name.

Inside your components TS file

```
let anInstanceOfDynamicComponent: DynamicComponent = new DynamicComponent();

// optional- only in use for sso-dynamic-module-component
anInstanceOfDynamicComponent.moduleType: SomeModule;

anInstanceOfDynamicComponent.componentType: SomeComponent;
anInstanceOfDynamicComponent.inputs = {
    varA: 1,
    varB: 'B'
};
anInstanceOfDynamicComponent.outputs: any = {
    'clicked': this.clickedSomeComponent();
};
```


