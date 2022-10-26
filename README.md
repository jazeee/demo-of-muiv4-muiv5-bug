# Demo of Material v4 + v5 style bugs

This is a playground app to test a bug related to styling from
default MUI, messing with v5.

## Details

As we introduced and upgraded `styled` components from `MUIv4` to
`MUIv5`, we ran into a bug where `MUIv5` components styles were
being overwritten by the styles from the default (un-theme'd) MUIv4
configuration.
           
This code is a demonstration of that bug, reduced to its root cause.

## Run

* `yarn start`
* Open <http://localhost:9999>

## Build

Install a web server like `npm install --global serve`

<https://www.npmjs.com/package/serve>

* `yarn build`
* `serve --single -p 5000 build/`
* Open <http://localhost:5000>

## Bug to observe

* The mix of V4 and V5 styled components and components cause CSS precedence issues
* When running this app, the last button should be big purple, with yellow text
* Observe that the class: `MuiButtonBase-root` has styles that are defined, and injected last.
  * Injected last in the DOM increases its CSS precedence over the MUIv5 CSS.
  * This class is the MUIv4 base class (unthemed)

### Fixing the issue

`StylesProvider` appears to change the behavior definitively, as long as either `injectFirst`
or `generateClassName` is defined.

* Test by adjusting `Scenario.NO_STYLES_PROVIDER` options.

The alternate scenarios fix the bug:

* `injectFirst` moves the MUIv4 class to have lower precedence but any style on `MuiButtonBase-root` can still apply
* `generateClassName` renames the MUIv4 class so that it can't interfere with MUIv5 classes.
