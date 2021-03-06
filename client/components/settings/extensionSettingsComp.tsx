import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "urql";
import styles from "../../styles/Settings.module.scss";

const Me = `
    query {
        me {
            settings {
                extensionSettings {
                    onlyFriendsCanView
                    popoutSummary
                    showSettingsLink
                    referFriendLink
                    privateByDefault
                    showPrivacyCircle
                }
            }
        }
    }

`;

const UpdateSettings = `
    mutation($options: UpdateExtensionSettingsInput!) {
        updateExtensionSettings(options: $options)
    }
`;

function ExtensionSettings() {
  const [friendsOnly, setFriendsOnly] = useState(false);
  const [popoutSummary, setPopoutSummary] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [referFriendLink, setReferFriendLink] = useState(false);
  const [privateByDefault, setPrivateByDefault] = useState(false);
  const [showPrivacyCircle, setShowPrivacyCircle] = useState(false);

  const [result, reexecuteMe] = useQuery({ query: Me });
  const [updateSettingsResult, updateSettings] = useMutation(UpdateSettings);

  useEffect(() => {
    if (
      result.data &&
      result.data.me &&
      result.data.me.settings &&
      result.data.me.settings.extensionSettings &&
      result.data.me.settings.extensionSettings.onlyFriendsCanView
    ) {
      setFriendsOnly(
        result.data.me.settings.extensionSettings.onlyFriendsCanView
      );
    }
    if (
      result.data &&
      result.data.me &&
      result.data.me.settings &&
      result.data.me.settings.extensionSettings &&
      result.data.me.settings.extensionSettings.popoutSummary
    ) {
      setPopoutSummary(result.data.me.settings.extensionSettings.popoutSummary);
    }
    if (
      result.data &&
      result.data.me &&
      result.data.me.settings &&
      result.data.me.settings.extensionSettings &&
      result.data.me.settings.extensionSettings.showSettingsLink
    ) {
      setShowSettings(
        result.data.me.settings.extensionSettings.showSettingsLink
      );
    }
    if (
      result.data &&
      result.data.me &&
      result.data.me.settings &&
      result.data.me.settings.extensionSettings &&
      result.data.me.settings.extensionSettings.referFriendLink
    ) {
      setReferFriendLink(
        result.data.me.settings.extensionSettings.referFriendLink
      );
    }
    if (
      result.data &&
      result.data.me &&
      result.data.me.settings &&
      result.data.me.settings.extensionSettings &&
      result.data.me.settings.extensionSettings.privateByDefault
    ) {
      setPrivateByDefault(
        result.data.me.settings.extensionSettings.privateByDefault
      );
    }
    if (
      result.data &&
      result.data.me &&
      result.data.me.settings &&
      result.data.me.settings.extensionSettings &&
      result.data.me.settings.extensionSettings.showPrivacyCircle
    ) {
      setShowPrivacyCircle(
        result.data.me.settings.extensionSettings.showPrivacyCircle
      );
    }
  }, [result]);

  const handleChangePopoutSettings = (value) => {
    updateSettings({
      options: {
        popout: value,
        onlyFriendsCanView: friendsOnly,
        showSettings,
        referFriendLink,
      },
    });
  };

  const handleChangeFriendsSettings = (value) => {
    updateSettings({
      options: {
        popout: popoutSummary,
        onlyFriendsCanView: value,
        showSettings,
        referFriendLink,
      },
    });
  };

  const handleChangeShowSettings = (value) => {
    updateSettings({
      options: {
        popout: popoutSummary,
        onlyFriendsCanView: friendsOnly,
        showSettings: value,
        referFriendLink,
      },
    });
  };

  const handleChangeReferSettings = (value) => {
    updateSettings({
      options: {
        popout: popoutSummary,
        onlyFriendsCanView: friendsOnly,
        showSettings: showSettings,
        referFriendLink: value,
      },
    });
  };

  const handleChangeShowPrivacyCircleSettings = (value) => {
    updateSettings({
      options: {
        popout: popoutSummary,
        onlyFriendsCanView: friendsOnly,
        showSettings: showSettings,
        referFriendLink: referFriendLink,
        showPrivacyCircle: value,
        privateByDefault: privateByDefault,
      },
    });
  };

  const handleChangePrivacyByDefault = (value) => {
    updateSettings({
      options: {
        popout: popoutSummary,
        onlyFriendsCanView: friendsOnly,
        showSettings: showSettings,
        referFriendLink: referFriendLink,
        showPrivacyCircle: showPrivacyCircle,
        privateByDefault: value,
      },
    });
  };

  return (
    <section className={styles.extension}>
      {result.fetching ? (
        <div className={styles.loader}></div>
      ) : (
        <>
          <div className={styles.extensionContainer}>
            <div className={styles.top}>
              <h3 className={styles.label}>Popout Summary</h3>
              <div className={styles.toggleContainer}>
                <input
                  type="checkbox"
                  name="switch"
                  id="switch"
                  className={styles.switch}
                  defaultChecked={
                    result.data &&
                    result.data.me &&
                    result.data.me.settings &&
                    result.data.me.settings.extensionSettings &&
                    result.data.me.settings.extensionSettings.popoutSummary
                  }
                  onChange={(e) => {
                    setPopoutSummary(e.currentTarget.checked);
                    handleChangePopoutSettings(e.currentTarget.checked);
                  }}
                />
              </div>
            </div>
            <p className={styles.extensionDesc}>
              When enabled, clicking &quot;Summarize&quot; in the extension will
              open a new tab with the summary and related information. This is
              useful for individuals who want to see a larger font-size summary.
            </p>
          </div>
          <div className={styles.extensionContainer}>
            <div className={styles.top}>
              <h3 className={styles.label}>Friends Only</h3>
              <div className={styles.toggleContainer}>
                <input
                  type="checkbox"
                  name="switch"
                  id="switch"
                  className={styles.switch}
                  defaultChecked={
                    result.data &&
                    result.data.me &&
                    result.data.me.settings &&
                    result.data.me.settings.extensionSettings &&
                    result.data.me.settings.extensionSettings.onlyFriendsCanView
                  }
                  onChange={(e) => {
                    setFriendsOnly(e.currentTarget.checked);
                    handleChangeFriendsSettings(e.currentTarget.checked);
                  }}
                />
              </div>
            </div>
            <p className={styles.extensionDesc}>
              When enabled, only your friends will be able to view your posts.
              If disabled, everyone can view your posts.
            </p>
          </div>
          <div className={styles.extensionContainer}>
            <div className={styles.top}>
              <h3 className={styles.label}>Private by Default</h3>
              <div className={styles.toggleContainer}>
                <input
                  type="checkbox"
                  name="switch"
                  id="switch"
                  className={styles.switch}
                  defaultChecked={
                    result.data &&
                    result.data.me &&
                    result.data.me.settings &&
                    result.data.me.settings.extensionSettings &&
                    result.data.me.settings.extensionSettings.privateByDefault
                  }
                  onChange={(e) => {
                    setPrivateByDefault(e.currentTarget.checked);
                    handleChangePrivacyByDefault(e.currentTarget.checked);
                  }}
                />
              </div>
            </div>
            <p className={styles.extensionDesc}>
              When enabled, all of your summaries will be private by default and
              require you to &quot;unprivate&quot; them to allow your friends to
              see your summaries.
            </p>
          </div>
          <div className={styles.extensionContainer}>
            <div className={styles.top}>
              <h3 className={styles.label}>Show Settings Icon</h3>
              <div className={styles.toggleContainer}>
                <input
                  type="checkbox"
                  name="switch"
                  id="switch"
                  className={styles.switch}
                  defaultChecked={
                    result.data &&
                    result.data.me &&
                    result.data.me.settings &&
                    result.data.me.settings.extensionSettings &&
                    result.data.me.settings.extensionSettings.showSettingsLink
                  }
                  onChange={(e) => {
                    setShowSettings(e.currentTarget.checked);
                    handleChangeShowSettings(e.currentTarget.checked);
                  }}
                />
              </div>
            </div>
            <p className={styles.extensionDesc}>
              When enabled, you have quick access to the settings page through
              the icon in the bottom left corner of the extension. When
              disabled, this icon disappears.
            </p>
          </div>
          <div className={styles.extensionContainer}>
            <div className={styles.top}>
              <h3 className={styles.label}>Show Refer Friend Icon</h3>
              <div className={styles.toggleContainer}>
                <input
                  type="checkbox"
                  name="switch"
                  id="switch"
                  className={styles.switch}
                  defaultChecked={
                    result.data &&
                    result.data.me &&
                    result.data.me.settings &&
                    result.data.me.settings.extensionSettings &&
                    result.data.me.settings.extensionSettings.referFriendLink
                  }
                  onChange={(e) => {
                    setReferFriendLink(e.currentTarget.checked);
                    handleChangeReferSettings(e.currentTarget.checked);
                  }}
                />
              </div>
            </div>
            <p className={styles.extensionDesc}>
              When enabled, you have quick access to the referral page through
              the icon in the bottom left corner of the extension. When
              disabled, this icon disappears.
            </p>
          </div>
          <div className={styles.extensionContainer}>
            <div className={styles.top}>
              <h3 className={styles.label}>Show Private Toggle Button</h3>
              <div className={styles.toggleContainer}>
                <input
                  type="checkbox"
                  name="switch"
                  id="switch"
                  className={styles.switch}
                  defaultChecked={
                    result.data &&
                    result.data.me &&
                    result.data.me.settings &&
                    result.data.me.settings.extensionSettings &&
                    result.data.me.settings.extensionSettings.showPrivacyCircle
                  }
                  onChange={(e) => {
                    setShowPrivacyCircle(e.currentTarget.checked);
                    handleChangeShowPrivacyCircleSettings(
                      e.currentTarget.checked
                    );
                  }}
                />
              </div>
            </div>
            <p className={styles.extensionDesc}>
              When enabled, you have quick access to a toggle that allows you to
              summarize privately. In other words, you can summarize without any
              of your friends seeing your summary.
            </p>
          </div>
        </>
      )}
    </section>
  );
}

export default ExtensionSettings;
