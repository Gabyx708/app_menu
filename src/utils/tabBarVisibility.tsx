export const hideTabBar = (): void => {
    const tabBar = document.getElementsByTagName('ion-tab-bar')[0];
    if (tabBar !== null) {
      console.log("el tab:"+tabBar)
      tabBar.style.display = 'none';
    }
  };

  // https://stackoverflow.com/a/62097522
export const showTabBar = (): void => {
    const tabBar = document.getElementsByTagName('ion-tab-bar')[0];
    if (tabBar !== null) {
      tabBar.style.display = 'flex';
    }
  };