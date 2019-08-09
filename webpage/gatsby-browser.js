/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

exports.onServiceWorkerUpdateReady = () => {
  /*
  const answer = window.confirm(
    `This website has been updated. ` +
      `Reload to display the latest version?`
  )

  if (answer === true) {
    window.location.reload()
  }
  */
  window.location.reload();
};
