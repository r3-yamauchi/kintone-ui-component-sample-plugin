(function(PLUGIN_ID) {
  'use strict';

  /**
   * kintone UI Component デモプラグイン
   *
   * このプラグインは設定画面でkintone UI Componentを体験するためのものです。
   * デスクトップ版では特別な機能は実装されていません。
   */

  kintone.events.on('app.record.index.show', function(event) {
    console.log('kintone UI Component デモプラグインが読み込まれました（デスクトップ版）');
    return event;
  });

})(kintone.$PLUGIN_ID);
