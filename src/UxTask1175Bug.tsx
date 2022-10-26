import { IconButton } from '@material-ui/core';
import { ThemeProvider, createTheme, createGenerateClassName, StylesProvider } from '@material-ui/core/styles';
import {
  Button,
} from '@mui/material';
import {
  styled as styledV5,
  ThemeProvider as ThemeProviderV5,
  createTheme as createThemeV5,
} from '@mui/material/styles';

const themeV4 = createTheme({
  overrides: {
    MuiButton: {
      containedPrimary: {
        color: 'yellow',
        backgroundColor: 'purple',
      },
      root: {
        padding: '50px',
      },
    },
  },
});

const buttonThemeV5 = createThemeV5({
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: 'yellow',
          backgroundColor: 'purple',
        },
        root: {
          padding: '50px',
        },
      },
    },
  },
});

const TestComponent = styledV5('div')({
  background: 'red',
  minHeight: '16px',
  minWidth: '16px',
});

const Content: React.FC = () => {
  return (
    <ThemeProvider theme={themeV4}>
      <ThemeProviderV5 theme={buttonThemeV5}>
        <TestComponent>
          This v5 styled div is loaded before the MUIv5 theme - equivalent to NavigationAnnouncer
        </TestComponent>
        <IconButton onClick={() => { }}>
          This, in combination with NavigationAnnouncer, causes the bug. It is equivalent to the
          `IconButton` in the Mobile nav bar.
        </IconButton>
        <Button variant="contained" onClick={() => { }}>
          Test Button Should Be Yellow text, Purple background, and large padding.
        </Button>
      </ThemeProviderV5>
    </ThemeProvider>
  )
}

const generateClassName = createGenerateClassName({
  seed: 'muiV4-',
});

enum Scenario {
  NO_STYLES_PROVIDER,
  MUIV4_STYLES_PROVIDER_WITH_GENERATE_CLASS_NAME,
  MUIV4_STYLES_PROVIDER_WITH_INJECT_FIRST,
}

const UxTask1175BugScenario: React.FC<{ scenario: Scenario }> = (props) => {
  const { scenario } = props;
  switch (scenario) {
    case Scenario.NO_STYLES_PROVIDER:
      return <Content />;
    case Scenario.MUIV4_STYLES_PROVIDER_WITH_GENERATE_CLASS_NAME:
      return (
        <StylesProvider generateClassName={generateClassName}>
          <Content />;
        </StylesProvider>
      );
    case Scenario.MUIV4_STYLES_PROVIDER_WITH_INJECT_FIRST:
      return (
        <StylesProvider injectFirst>
          <Content />;
        </StylesProvider>
      );
  }
};

export const UxTask1175Bug = () => {
  // Change scenario here, then refresh UI to trigger reload of css.
  return <UxTask1175BugScenario scenario={Scenario.NO_STYLES_PROVIDER} />;
}
