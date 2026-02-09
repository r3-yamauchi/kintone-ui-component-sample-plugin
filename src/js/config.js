(function(PLUGIN_ID) {
  'use strict';

  // kintone UI Componentの初期化を待つ
  if (typeof Kucs === 'undefined' || !Kucs['1.24.0']) {
    console.error('kintone UI Component が読み込まれていません');
    return;
  }

  const Kuc = Kucs['1.24.0'];

  /**
   * Button コンポーネントのデモ
   */
  function initButtonDemo() {
    const container = document.getElementById('button-demo');
    const output = document.getElementById('button-output');

    // 複数のボタンを作成
    const buttons = [
      new Kuc.Button({
        text: '通常ボタン',
        type: 'normal'
      }),
      new Kuc.Button({
        text: '送信ボタン',
        type: 'submit'
      }),
      new Kuc.Button({
        text: '無効なボタン',
        type: 'normal',
        disabled: true
      })
    ];

    buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
        output.textContent = `ボタン ${index + 1} がクリックされました！`;
        output.style.cssText = 'margin-top: 12px; padding: 8px; background-color: #e3f2fd; border-radius: 4px;';
      });
      container.appendChild(button);

      // ボタン間にスペースを追加
      if (index < buttons.length - 1) {
        const space = document.createElement('span');
        space.style.marginRight = '12px';
        container.appendChild(space);
      }
    });
  }

  /**
   * DatePicker コンポーネントのデモ
   */
  function initDatePickerDemo() {
    const container = document.getElementById('datepicker-demo');
    const output = document.getElementById('datepicker-output');

    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];

    const datePicker = new Kuc.DatePicker({
      label: '日付を選択',
      value: dateStr,
      language: 'ja',
      requiredIcon: true
    });

    datePicker.addEventListener('change', (event) => {
      output.textContent = `選択された日付: ${event.detail.value || '(未選択)'}`;
      output.style.cssText = 'margin-top: 12px; padding: 8px; background-color: #f3e5f5; border-radius: 4px;';
    });

    container.appendChild(datePicker);
  }

  /**
   * Combobox コンポーネントのデモ
   */
  function initComboboxDemo() {
    const container = document.getElementById('combobox-demo');
    const output = document.getElementById('combobox-output');

    const fruits = [
      { label: 'りんご', value: 'apple' },
      { label: 'バナナ', value: 'banana' },
      { label: 'オレンジ', value: 'orange' },
      { label: 'ぶどう', value: 'grape' },
      { label: 'いちご', value: 'strawberry' },
      { label: 'メロン', value: 'melon' },
      { label: 'もも', value: 'peach' }
    ];

    const combobox = new Kuc.Combobox({
      label: '好きな果物を選択',
      items: fruits,
      value: 'apple',
      requiredIcon: true
    });

    combobox.addEventListener('change', (event) => {
      const selectedItem = fruits.find(f => f.value === event.detail.value);
      output.textContent = `選択: ${selectedItem ? selectedItem.label : '(未選択)'} (${event.detail.value || 'なし'})`;
      output.style.cssText = 'margin-top: 12px; padding: 8px; background-color: #fff3e0; border-radius: 4px;';
    });

    container.appendChild(combobox);
  }

  /**
   * UserOrgGroupSelect コンポーネントのデモ
   */
  async function initUserOrgGroupSelectDemo() {
    const container = document.getElementById('user-org-group-select-demo');
    const output = document.getElementById('user-org-group-select-output');

    try {
      // グループ情報を取得
      const url = kintone.api.url('/v1/groups.json', true);
      const resp = await kintone.api(url, 'GET', {});
      const groups = resp.groups || [];

      const items = groups.map(group => ({
        label: group.name,
        value: group.code,
        type: 'group'
      }));

      const selector = new Kuc.UserOrgGroupSelect({
        label: 'グループを選択',
        items: items,
        value: [],
        placeholder: 'グループを選択してください',
        icon: 'group'
      });

      selector.addEventListener('change', (event) => {
        const selectedCount = event.detail.value ? event.detail.value.length : 0;
        output.textContent = `${selectedCount} 件のグループが選択されています: ${event.detail.value.join(', ')}`;
        output.style.cssText = 'margin-top: 12px; padding: 8px; background-color: #e8f5e9; border-radius: 4px;';
      });

      container.appendChild(selector);
    } catch (error) {
      console.error('グループ情報の取得に失敗しました:', error);
      output.textContent = 'グループ情報の取得に失敗しました';
      output.style.cssText = 'margin-top: 12px; padding: 8px; background-color: #ffebee; border-radius: 4px;';
    }
  }

  /**
   * Attachment コンポーネントのデモ
   */
  function initAttachmentDemo() {
    const container = document.getElementById('attachment-demo');
    const output = document.getElementById('attachment-output');

    const attachment = new Kuc.Attachment({
      label: 'ファイルを添付',
      files: [],
      language: 'ja',
      requiredIcon: true
    });

    attachment.addEventListener('change', (event) => {
      const fileCount = event.detail.files ? event.detail.files.length : 0;
      const fileNames = event.detail.files ? event.detail.files.map(f => f.name).join(', ') : 'なし';
      output.textContent = `${fileCount} 件のファイルが選択されています: ${fileNames}`;
      output.style.cssText = 'margin-top: 12px; padding: 8px; background-color: #fce4ec; border-radius: 4px;';
    });

    container.appendChild(attachment);
  }

  /**
   * ReadOnlyTable コンポーネントのデモ
   */
  function initReadOnlyTableDemo() {
    const container = document.getElementById('readonly-table-demo');

    const sampleData = [
      { id: '1', name: '山田太郎', department: '営業部', email: 'yamada@example.com' },
      { id: '2', name: '佐藤花子', department: '開発部', email: 'sato@example.com' },
      { id: '3', name: '鈴木一郎', department: '人事部', email: 'suzuki@example.com' },
      { id: '4', name: '田中美咲', department: '営業部', email: 'tanaka@example.com' },
      { id: '5', name: '高橋健太', department: '開発部', email: 'takahashi@example.com' }
    ];

    const table = new Kuc.ReadOnlyTable({
      label: '社員一覧',
      columns: [
        {
          title: 'ID',
          field: 'id'
        },
        {
          title: '氏名',
          field: 'name'
        },
        {
          title: '部署',
          field: 'department'
        },
        {
          title: 'メールアドレス',
          field: 'email'
        }
      ],
      data: sampleData
    });

    container.appendChild(table);
  }

  /**
   * FieldGroup コンポーネントのデモ
   */
  function initFieldGroupDemo() {
    const container = document.getElementById('fieldgroup-demo');

    // フィールドグループ内に配置するコンポーネント
    const nameInput = new Kuc.Text({
      label: '名前',
      value: '',
      placeholder: '山田太郎',
      requiredIcon: true
    });

    const ageInput = new Kuc.Text({
      label: '年齢',
      value: '',
      placeholder: '30',
      requiredIcon: false
    });

    const genderDropdown = new Kuc.Dropdown({
      label: '性別',
      items: [
        { label: '男性', value: 'male' },
        { label: '女性', value: 'female' },
        { label: 'その他', value: 'other' }
      ],
      value: 'male'
    });

    const fieldGroup = new Kuc.FieldGroup({
      label: 'ユーザー情報',
      content: `
        <div style="display: grid; gap: 16px;">
          <div id="name-field"></div>
          <div id="age-field"></div>
          <div id="gender-field"></div>
        </div>
      `
    });

    container.appendChild(fieldGroup);

    // フィールドグループ内にコンポーネントを配置
    setTimeout(() => {
      const nameField = fieldGroup.querySelector('#name-field');
      const ageField = fieldGroup.querySelector('#age-field');
      const genderField = fieldGroup.querySelector('#gender-field');

      if (nameField) nameField.appendChild(nameInput);
      if (ageField) ageField.appendChild(ageInput);
      if (genderField) genderField.appendChild(genderDropdown);
    }, 0);
  }

  /**
   * Text コンポーネントのデモ
   */
  function initTextDemo() {
    const container = document.getElementById('text-demo');
    const output = document.getElementById('text-output');

    const text = new Kuc.Text({
      label: 'お名前',
      placeholder: '山田太郎',
      value: '',
      requiredIcon: true,
      error: ''
    });

    text.addEventListener('change', (event) => {
      output.textContent = `入力値: ${event.detail.value || '(空)'}`;
      output.style.cssText = 'margin-top: 12px; padding: 8px; background-color: #e1f5fe; border-radius: 4px;';
    });

    container.appendChild(text);
  }

  /**
   * TextArea コンポーネントのデモ
   */
  function initTextAreaDemo() {
    const container = document.getElementById('textarea-demo');
    const output = document.getElementById('textarea-output');

    const textarea = new Kuc.TextArea({
      label: 'コメント',
      placeholder: 'ご意見をお聞かせください',
      value: '',
      requiredIcon: false
    });

    textarea.addEventListener('change', (event) => {
      const charCount = event.detail.value ? event.detail.value.length : 0;
      output.textContent = `文字数: ${charCount} 文字`;
      output.style.cssText = 'margin-top: 12px; padding: 8px; background-color: #f1f8e9; border-radius: 4px;';
    });

    container.appendChild(textarea);
  }

  /**
   * Checkbox コンポーネントのデモ
   */
  function initCheckboxDemo() {
    const container = document.getElementById('checkbox-demo');
    const output = document.getElementById('checkbox-output');

    const checkbox = new Kuc.Checkbox({
      label: '趣味を選択',
      items: [
        { label: '読書', value: 'reading' },
        { label: '映画鑑賞', value: 'movies' },
        { label: 'スポーツ', value: 'sports' },
        { label: '音楽', value: 'music' },
        { label: '旅行', value: 'travel' }
      ],
      value: ['reading', 'music']
    });

    checkbox.addEventListener('change', (event) => {
      const selectedCount = event.detail.value ? event.detail.value.length : 0;
      output.textContent = `${selectedCount} 件選択: ${event.detail.value.join(', ')}`;
      output.style.cssText = 'margin-top: 12px; padding: 8px; background-color: #fce4ec; border-radius: 4px;';
    });

    container.appendChild(checkbox);
  }

  /**
   * RadioButton コンポーネントのデモ
   */
  function initRadioButtonDemo() {
    const container = document.getElementById('radiobutton-demo');
    const output = document.getElementById('radiobutton-output');

    const radioButton = new Kuc.RadioButton({
      label: '配送方法を選択',
      items: [
        { label: '通常配送（5-7日）', value: 'standard' },
        { label: 'お急ぎ便（2-3日）', value: 'express' },
        { label: '当日お届け便', value: 'same-day' }
      ],
      value: 'standard'
    });

    radioButton.addEventListener('change', (event) => {
      const selectedItem = radioButton.items.find(item => item.value === event.detail.value);
      output.textContent = `選択: ${selectedItem ? selectedItem.label : ''}`;
      output.style.cssText = 'margin-top: 12px; padding: 8px; background-color: #fff9c4; border-radius: 4px;';
    });

    container.appendChild(radioButton);
  }

  /**
   * Dropdown コンポーネントのデモ
   */
  function initDropdownDemo() {
    const container = document.getElementById('dropdown-demo');
    const output = document.getElementById('dropdown-output');

    const dropdown = new Kuc.Dropdown({
      label: '都道府県を選択',
      items: [
        { label: '東京都', value: 'tokyo' },
        { label: '大阪府', value: 'osaka' },
        { label: '愛知県', value: 'aichi' },
        { label: '福岡県', value: 'fukuoka' },
        { label: '北海道', value: 'hokkaido' },
        { label: '神奈川県', value: 'kanagawa' }
      ],
      value: 'tokyo',
      requiredIcon: true
    });

    dropdown.addEventListener('change', (event) => {
      const selectedItem = dropdown.items.find(item => item.value === event.detail.value);
      output.textContent = `選択: ${selectedItem ? selectedItem.label : ''}`;
      output.style.cssText = 'margin-top: 12px; padding: 8px; background-color: #e0f7fa; border-radius: 4px;';
    });

    container.appendChild(dropdown);
  }

  /**
   * MultiChoice コンポーネントのデモ
   */
  function initMultiChoiceDemo() {
    const container = document.getElementById('multichoice-demo');
    const output = document.getElementById('multichoice-output');

    const multiChoice = new Kuc.MultiChoice({
      label: 'プログラミング言語を選択',
      items: [
        { label: 'JavaScript', value: 'js' },
        { label: 'Python', value: 'python' },
        { label: 'Java', value: 'java' },
        { label: 'C#', value: 'csharp' },
        { label: 'Go', value: 'go' },
        { label: 'Ruby', value: 'ruby' },
        { label: 'PHP', value: 'php' }
      ],
      value: ['js', 'python']
    });

    multiChoice.addEventListener('change', (event) => {
      const selectedCount = event.detail.value ? event.detail.value.length : 0;
      output.textContent = `${selectedCount} 件選択: ${event.detail.value.join(', ')}`;
      output.style.cssText = 'margin-top: 12px; padding: 8px; background-color: #f3e5f5; border-radius: 4px;';
    });

    container.appendChild(multiChoice);
  }

  /**
   * DateTimePicker コンポーネントのデモ
   */
  function initDateTimePickerDemo() {
    const container = document.getElementById('datetimepicker-demo');
    const output = document.getElementById('datetimepicker-output');

    const now = new Date();
    const dateTimeStr = now.toISOString().substring(0, 19);

    const dateTimePicker = new Kuc.DateTimePicker({
      label: '日付と時刻を選択',
      value: dateTimeStr,
      language: 'ja',
      requiredIcon: true
    });

    dateTimePicker.addEventListener('change', (event) => {
      output.textContent = `選択された日時: ${event.detail.value || '(未選択)'}`;
      output.style.cssText = 'margin-top: 12px; padding: 8px; background-color: #e1bee7; border-radius: 4px;';
    });

    container.appendChild(dateTimePicker);
  }

  /**
   * Switch コンポーネントのデモ
   */
  function initSwitchDemo() {
    const container = document.getElementById('switch-demo');
    const output = document.getElementById('switch-output');

    const kucSwitch = new Kuc.Switch({
      label: '通知を有効にする',
      checked: true,
      checkedText: 'ON',
      unCheckedText: 'OFF'
    });

    kucSwitch.addEventListener('change', (event) => {
      const status = event.detail.checked ? 'オン' : 'オフ';
      output.textContent = `スイッチ: ${status}`;
      output.style.cssText = 'margin-top: 12px; padding: 8px; background-color: #c5e1a5; border-radius: 4px;';
    });

    container.appendChild(kucSwitch);
  }

  /**
   * Table コンポーネントのデモ
   */
  function initTableDemo() {
    const container = document.getElementById('table-demo');
    const output = document.getElementById('table-output');

    const table = new Kuc.Table({
      label: '商品一覧',
      columns: [
        { title: '商品名', field: 'name' },
        { title: '価格', field: 'price' },
        { title: '在庫', field: 'stock' }
      ],
      data: [
        { name: 'ノートPC', price: '¥120,000', stock: '5' },
        { name: 'マウス', price: '¥2,500', stock: '20' },
        { name: 'キーボード', price: '¥8,000', stock: '15' }
      ],
      actionButton: true,
      headerVisible: true
    });

    table.addEventListener('change', (event) => {
      const type = event.detail.type;
      if (type === 'add-row') {
        output.textContent = '行が追加されました';
      } else if (type === 'remove-row') {
        output.textContent = `行 ${event.detail.rowIndex + 1} が削除されました`;
      } else if (type === 'change-cell') {
        output.textContent = `行 ${event.detail.rowIndex + 1} のセルが変更されました`;
      }
      output.style.cssText = 'margin-top: 12px; padding: 8px; background-color: #fff9c4; border-radius: 4px;';
    });

    container.appendChild(table);
  }

  /**
   * Tooltip コンポーネントのデモ
   */
  function initTooltipDemo() {
    const container = document.getElementById('tooltip-demo');

    // ツールチップを表示するためのボタンを作成
    const button = new Kuc.Button({
      text: 'このボタンにマウスを乗せてください',
      type: 'normal'
    });

    // ツールチップを作成
    const tooltip = new Kuc.Tooltip({
      title: 'これはツールチップです。マウスオーバーで情報を表示できます。',
      container: button,
      placement: 'bottom',
      describeChild: true
    });

    container.appendChild(tooltip);
  }

  /**
   * TimePicker コンポーネントのデモ
   */
  function initTimePickerDemo() {
    const container = document.getElementById('timepicker-demo');
    const output = document.getElementById('timepicker-output');

    const timePicker = new Kuc.TimePicker({
      label: '時刻を選択',
      value: '09:00',
      language: 'ja',
      requiredIcon: true
    });

    timePicker.addEventListener('change', (event) => {
      output.textContent = `選択された時刻: ${event.detail.value || '(未選択)'}`;
      output.style.cssText = 'margin-top: 12px; padding: 8px; background-color: #ffe0b2; border-radius: 4px;';
    });

    container.appendChild(timePicker);
  }

  /**
   * Tabs コンポーネントのデモ
   */
  function initTabsDemo() {
    const container = document.getElementById('tabs-demo');
    const output = document.getElementById('tabs-output');

    const tabs = new Kuc.Tabs({
      items: [
        {
          label: 'タブ1',
          value: 'tab1',
          content: '<div style="padding: 16px;">タブ1のコンテンツです。ここに様々な情報を表示できます。</div>'
        },
        {
          label: 'タブ2',
          value: 'tab2',
          content: '<div style="padding: 16px;">タブ2のコンテンツです。別の情報を表示しています。</div>'
        },
        {
          label: 'タブ3',
          value: 'tab3',
          content: '<div style="padding: 16px;">タブ3のコンテンツです。さらに別の情報があります。</div>'
        }
      ],
      value: 'tab1'
    });

    tabs.addEventListener('change', (event) => {
      output.textContent = `選択されたタブ: ${event.detail.value}`;
      output.style.cssText = 'margin-top: 12px; padding: 8px; background-color: #ffccbc; border-radius: 4px;';
    });

    container.appendChild(tabs);
  }

  /**
   * 閉じるボタンのイベントリスナー
   */
  function initCloseButton() {
    document.getElementById('close-button').addEventListener('click', function() {
      window.location.href = '../../flow?app=' + kintone.app.getId();
    });
  }

  /**
   * 初期化処理
   */
  async function init() {
    try {
      // 各コンポーネントのデモを初期化（コンポーネント一覧の順番に合わせています）
      initAttachmentDemo();
      initButtonDemo();
      initCheckboxDemo();
      initComboboxDemo();
      initDatePickerDemo();
      initDateTimePickerDemo();
      initDropdownDemo();
      initFieldGroupDemo();
      initMultiChoiceDemo();
      initRadioButtonDemo();
      initReadOnlyTableDemo();
      initSwitchDemo();
      initTableDemo();
      initTabsDemo();
      initTextDemo();
      initTextAreaDemo();
      initTimePickerDemo();
      initTooltipDemo();
      await initUserOrgGroupSelectDemo();
      initCloseButton();
    } catch (error) {
      console.error('初期化に失敗しました:', error);
    }
  }

  // ページ読み込み時に初期化
  init();

})(kintone.$PLUGIN_ID);
