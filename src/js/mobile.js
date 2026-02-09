(function(PLUGIN_ID) {
  'use strict';

  // kintone UI Componentの初期化を待つ
  if (typeof Kucs === 'undefined' || !Kucs['1.24.0']) {
    console.error('kintone UI Component が読み込まれていません');
    return;
  }

  const Kuc = Kucs['1.24.0'];

  /**
   * kintone UI Component デモプラグイン（モバイル版）
   *
   * レコード一覧画面に全てのモバイル版コンポーネントを表示します。
   */

  /**
   * デモコンテナを作成
   */
  function createDemoContainer() {
    const container = document.createElement('div');
    container.id = 'kuc-mobile-demo-container';
    container.style.cssText = `
      padding: 16px;
      background-color: #f5f6f8;
      font-family: 'メイリオ', Meiryo, 'Hiragino Kaku Gothic ProN', sans-serif;
    `;

    const title = document.createElement('h2');
    title.textContent = 'kintone UI Component モバイル版デモ';
    title.style.cssText = `
      margin: 0 0 16px 0;
      font-size: 18px;
      font-weight: 600;
      color: #2f3a45;
      border-bottom: 2px solid #3498db;
      padding-bottom: 8px;
    `;
    container.appendChild(title);

    const description = document.createElement('p');
    description.textContent = 'モバイル版の各コンポーネントを体験できます。';
    description.style.cssText = `
      margin: 0 0 16px 0;
      font-size: 14px;
      color: #666;
    `;
    container.appendChild(description);

    return container;
  }

  /**
   * デモセクションを作成
   */
  function createDemoSection(title, description) {
    const section = document.createElement('div');
    section.style.cssText = `
      padding: 16px;
      margin-bottom: 16px;
      background-color: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
    `;

    const titleEl = document.createElement('h3');
    titleEl.textContent = title;
    titleEl.style.cssText = `
      margin: 0 0 8px 0;
      font-size: 16px;
      font-weight: 600;
      color: #2f3a45;
    `;
    section.appendChild(titleEl);

    const descEl = document.createElement('p');
    descEl.textContent = description;
    descEl.style.cssText = `
      margin: 0 0 12px 0;
      font-size: 13px;
      color: #666;
    `;
    section.appendChild(descEl);

    const content = document.createElement('div');
    content.style.cssText = 'margin-bottom: 8px;';
    section.appendChild(content);

    const output = document.createElement('div');
    output.style.cssText = `
      padding: 8px;
      background-color: #e8f5e9;
      border-radius: 4px;
      font-size: 13px;
      color: #2e7d32;
      min-height: 20px;
    `;
    section.appendChild(output);

    return { section, content, output };
  }

  /**
   * MobileButton のデモ
   */
  function initMobileButtonDemo(container) {
    const { section, content, output } = createDemoSection(
      'MobileButton',
      'モバイル用ボタンコンポーネント'
    );

    const button = new Kuc.MobileButton({
      text: 'タップしてください',
      type: 'normal'
    });

    button.addEventListener('click', () => {
      output.textContent = 'ボタンがタップされました！';
    });

    content.appendChild(button);
    container.appendChild(section);
  }

  /**
   * MobileText のデモ
   */
  function initMobileTextDemo(container) {
    const { section, content, output } = createDemoSection(
      'MobileText',
      '1行テキスト入力コンポーネント'
    );

    const text = new Kuc.MobileText({
      label: 'お名前',
      placeholder: '山田太郎',
      value: '',
      requiredIcon: true
    });

    text.addEventListener('change', (event) => {
      output.textContent = `入力値: ${event.detail.value || '(空)'}`;
    });

    content.appendChild(text);
    container.appendChild(section);
  }

  /**
   * MobileTextArea のデモ
   */
  function initMobileTextAreaDemo(container) {
    const { section, content, output } = createDemoSection(
      'MobileTextArea',
      '複数行テキスト入力コンポーネント'
    );

    const textarea = new Kuc.MobileTextArea({
      label: 'コメント',
      placeholder: 'ご意見をお聞かせください',
      value: ''
    });

    textarea.addEventListener('change', (event) => {
      const charCount = event.detail.value ? event.detail.value.length : 0;
      output.textContent = `文字数: ${charCount} 文字`;
    });

    content.appendChild(textarea);
    container.appendChild(section);
  }

  /**
   * MobileCheckbox のデモ
   */
  function initMobileCheckboxDemo(container) {
    const { section, content, output } = createDemoSection(
      'MobileCheckbox',
      '複数選択可能なチェックボックス'
    );

    const checkbox = new Kuc.MobileCheckbox({
      label: '趣味を選択',
      items: [
        { label: '読書', value: 'reading' },
        { label: '映画鑑賞', value: 'movies' },
        { label: 'スポーツ', value: 'sports' }
      ],
      value: ['reading']
    });

    checkbox.addEventListener('change', (event) => {
      const selectedCount = event.detail.value ? event.detail.value.length : 0;
      output.textContent = `${selectedCount} 件選択: ${event.detail.value.join(', ')}`;
    });

    content.appendChild(checkbox);
    container.appendChild(section);
  }

  /**
   * MobileRadioButton のデモ
   */
  function initMobileRadioButtonDemo(container) {
    const { section, content, output } = createDemoSection(
      'MobileRadioButton',
      '単一選択のラジオボタン'
    );

    const radioButton = new Kuc.MobileRadioButton({
      label: '配送方法を選択',
      items: [
        { label: '通常配送', value: 'standard' },
        { label: 'お急ぎ便', value: 'express' }
      ],
      value: 'standard'
    });

    radioButton.addEventListener('change', (event) => {
      const selectedItem = radioButton.items.find(item => item.value === event.detail.value);
      output.textContent = `選択: ${selectedItem ? selectedItem.label : ''}`;
    });

    content.appendChild(radioButton);
    container.appendChild(section);
  }

  /**
   * MobileDropdown のデモ
   */
  function initMobileDropdownDemo(container) {
    const { section, content, output } = createDemoSection(
      'MobileDropdown',
      '単一選択のドロップダウン'
    );

    const dropdown = new Kuc.MobileDropdown({
      label: '都道府県を選択',
      items: [
        { label: '東京都', value: 'tokyo' },
        { label: '大阪府', value: 'osaka' },
        { label: '愛知県', value: 'aichi' }
      ],
      value: 'tokyo'
    });

    dropdown.addEventListener('change', (event) => {
      const selectedItem = dropdown.items.find(item => item.value === event.detail.value);
      output.textContent = `選択: ${selectedItem ? selectedItem.label : ''}`;
    });

    content.appendChild(dropdown);
    container.appendChild(section);
  }

  /**
   * MobileMultiChoice のデモ
   */
  function initMobileMultiChoiceDemo(container) {
    const { section, content, output } = createDemoSection(
      'MobileMultiChoice',
      'チップ形式で複数選択'
    );

    const multiChoice = new Kuc.MobileMultiChoice({
      label: 'プログラミング言語を選択',
      items: [
        { label: 'JavaScript', value: 'js' },
        { label: 'Python', value: 'python' },
        { label: 'Java', value: 'java' }
      ],
      value: ['js']
    });

    multiChoice.addEventListener('change', (event) => {
      const selectedCount = event.detail.value ? event.detail.value.length : 0;
      output.textContent = `${selectedCount} 件選択: ${event.detail.value.join(', ')}`;
    });

    content.appendChild(multiChoice);
    container.appendChild(section);
  }

  /**
   * MobileDatePicker のデモ
   */
  function initMobileDatePickerDemo(container) {
    const { section, content, output } = createDemoSection(
      'MobileDatePicker',
      '日付選択コンポーネント'
    );

    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];

    const datePicker = new Kuc.MobileDatePicker({
      label: '日付を選択',
      value: dateStr,
      language: 'ja'
    });

    datePicker.addEventListener('change', (event) => {
      output.textContent = `選択された日付: ${event.detail.value || '(未選択)'}`;
    });

    content.appendChild(datePicker);
    container.appendChild(section);
  }

  /**
   * MobileTimePicker のデモ
   */
  function initMobileTimePickerDemo(container) {
    const { section, content, output } = createDemoSection(
      'MobileTimePicker',
      '時刻選択コンポーネント'
    );

    const timePicker = new Kuc.MobileTimePicker({
      label: '時刻を選択',
      value: '09:00',
      language: 'ja'
    });

    timePicker.addEventListener('change', (event) => {
      output.textContent = `選択された時刻: ${event.detail.value || '(未選択)'}`;
    });

    content.appendChild(timePicker);
    container.appendChild(section);
  }

  /**
   * MobileDateTimePicker のデモ
   */
  function initMobileDateTimePickerDemo(container) {
    const { section, content, output } = createDemoSection(
      'MobileDateTimePicker',
      '日付時刻選択コンポーネント'
    );

    const now = new Date();
    const dateTimeStr = now.toISOString().substring(0, 19);

    const dateTimePicker = new Kuc.MobileDateTimePicker({
      label: '日付と時刻を選択',
      value: dateTimeStr,
      language: 'ja'
    });

    dateTimePicker.addEventListener('change', (event) => {
      output.textContent = `選択された日時: ${event.detail.value || '(未選択)'}`;
    });

    content.appendChild(dateTimePicker);
    container.appendChild(section);
  }

  /**
   * メインコンテナの初期化
   */
  function initMobileDemo() {
    const container = createDemoContainer();

    // 各コンポーネントのデモを初期化
    initMobileButtonDemo(container);
    initMobileTextDemo(container);
    initMobileTextAreaDemo(container);
    initMobileCheckboxDemo(container);
    initMobileRadioButtonDemo(container);
    initMobileDropdownDemo(container);
    initMobileMultiChoiceDemo(container);
    initMobileDatePickerDemo(container);
    initMobileTimePickerDemo(container);
    initMobileDateTimePickerDemo(container);

    return container;
  }

  /**
   * レコード一覧画面表示イベント
   */
  kintone.events.on('mobile.app.record.index.show', function(event) {
    try {
      // ヘッダースペースにデモコンテナを追加
      const header = kintone.mobile.app.getHeaderSpaceElement();
      if (header) {
        const demoContainer = initMobileDemo();
        header.appendChild(demoContainer);
      } else {
        console.warn('ヘッダースペースが見つかりません');
      }
    } catch (error) {
      console.error('モバイル版デモの初期化に失敗しました:', error);
    }
    return event;
  });

})(kintone.$PLUGIN_ID);
