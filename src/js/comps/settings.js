import $ from 'jquery';
import tmpl from 'blueimp-tmpl';

import Storage from '../utils/storage';

class Settings {
  constructor() {
    this.$root = $('[data-settings]');
    this.$handle = this.$root.find('.settings-handle');
    this.$settingsList = this.$root.find('.js-settings-list');

    this.storage = new Storage('settings');

    this.settings = [
      {
        id: 'wc',
        text: 'Show clock',
        checked: true,
        type: 'toggle'
      },
      {
        id: 'wl',
        text: 'Show location',
        checked: true,
        type: 'toggle'
      },
      {
        id: 'wt',
        text: 'Show tasks',
        checked: true,
        type: 'toggle'
      },
      {
        id: 'bg',
        text: 'Show background',
        checked: true,
        type: 'toggle'
      }
    ];

    const curSettings = this.storage.get('settings') || [];
    this.settings = this.settings.map(setting => {
      const curSetting = curSettings.find(_ => _.id == setting.id);

      if (curSetting) {
        return curSetting;
      }
      return setting;
    });

    this.applySettings();

    this.renderSettings();
    this.events();
  }

  events() {
    this.$handle.on('click.settings', () => {
      this.$root.toggleClass('is-open');
    });

    this.$root.on('click.settings', '.is-toggle', e => this.toggleSettings(e));
  }

  renderSettings() {
    let $settings = $('<div></div>');

    this.settings.forEach(setting => {
      const _setting = tmpl('settingItemTpl', setting);
      $settings.append(_setting);
    });

    this.$settingsList.html($settings.html());
  }

  getTaskNode(node) {
    return $(node).closest('.settings-item');
  }
  getNodeKey(node) {
    return this.getTaskNode(node).attr('key');
  }
  updateSettingsState(settings) {
    this.settings = [...settings];
    this.renderSettings();
    setTimeout(() => this.storage.set('settings', this.settings), 0);
  }

  toggleSettings(e) {
    const key = this.getNodeKey(e.target);
    const settings = this.settings.map(setting => {
      if (setting.id == key) {
        setting.checked = !setting.checked;
        this.applySetting(setting);
      }
      return setting;
    });
    this.updateSettingsState(settings);
  }

  applySetting(setting) {
    switch(setting.type) {
      case 'toggle':
        const $comp = $(`[data-component="${setting.id}"]`);
        if (setting.checked) {
          $comp.slideDown();
        } else {
          $comp.slideUp();
        }
        break;
    }
  }

  applySettings() {
    $('[data-component]').hide().removeClass('is-hidden');
    this.settings.forEach(setting => this.applySetting(setting));
  }
}

export default Settings;

/**
=toggle clock
=toggle location
=toggle tasks
adjust background opacity
import/export
*/

/*
quotes
motivation
cute cartoon characters
random
weather line icon at bottom of page
*/
