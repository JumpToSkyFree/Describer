import { setup } from "xstate";

export const userCategorizationUIMachine = setup({
  types: {
    context: {} as { value: null | string },
    events: {} as
      | { type: "categorization.ui.joinWaitingListClicked" }
      | { type: "categorization.ui.introHidden" },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgAddMBrAqAYk3QBcwoB7AJ1wC9nc385SlUgBtAAwBdRKDJtYuJv3wyQAD0QBGABwBOEgCZxAZk3GAbABZNAVgO7jN8wBoQATy3GDJcb-HmjAHZtS0CTcwBfCNc0LDxCUjYmbDAOAGEAG2FIBmZWTh4+ARIAV1wSJJT0rOoxKVU5BSUBVQ0EHX0jUwtrOwcnVw8EbU0SS10J7RHAm00zc10omIwcAmISPAgwNLz2Ll5m-FyWPcLD0vLNrfwJaSQQRsVlVsRzcxtDY0tjEN09R00lkGWhslhIgQMb2MX0sNhG4imUWiIHwbC28HusVWCQa8ieLXubQAtC53IgSUsQFj4usKNRaLims9CYhtN4DCMDDZueZxLprFZge1uYZIeZoZZYfDEcjqWtEslUplshBGfiVCyEJYDEK2T4-AZNLojXYEZS5QkNrgtgAhEpMJgCDGyPGHF5aiGGHSBSWBGaBXmkoZ6vziQ3G3Sm7TmlY00ibba7AoHZkupkE0BtULs72+-2BoW2D4GMXmQJGsM6GNxeUkWDYNgAdwAqrBUgBJfAAM04GDd90e-cziF04g+fOMgT+UOhAULIpLM8lcM0COjSKAA */
  initial: "picking",
  context: {
    value: null,
  },
  states: {
    picking: {
      on: {
        "categorization.ui.joinWaitingListClicked": {
          target: "hideIntro",
        },
      },
    },
    hideIntro: {
      on: {
        "categorization.ui.introHidden": {
          target: "hiddenIntro",
        },
      },
    },
    hiddenIntro: {},
  },
});
