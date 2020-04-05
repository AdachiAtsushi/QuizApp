/**
 *
 * @author atsuk0r0
 * @since 2020/04/05
 *
 */

'use strict';

{
  // ------------------- ローカル変数の定義 -------------------
  // 画面上の要素を取得
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  // クイズの配列を定義
  const quizSet = shuffle([
    {
      quiz: '世界で一番大きな湖は?',
      choice: ['カスピ海', 'カリブ海', '琵琶湖'],
    },
    {
      quiz: '江戸幕府を創設したのは誰?',
      choice: ['徳川家康', '徳川慶喜', '徳川綱吉'],
    },
    {
      quiz: '郵政民営化を薦めたのは誰?',
      choice: ['小泉純一郎', '小泉幸太郎', '麻生太郎'],
    },
  ]);

  // 解答数
  let currentNum = 0;

  // 解答確認フラグ
  let isAnswerd;

  // 正答数
  let score = 0;

  //  ------------------- 関数の定義 -------------------

  /**
   *
   * @param {*} arr
   * @returns
   * 【処理の内容】
   * カウンタ変数の値が配列の要素数-1から0になるまでループ処理を行う。
   * 要素数未満のランダムな値を取得し、分割代入によって入れ替える。
   */
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      // 要素数未満の数をランダムに生成
      const j = Math.floor(Math.random() * (i + 1));

      // 配列内の要素を分割代入
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  /**
   *
   * @param {*} li
   * @returns
   * 【処理の内容】
   * 選択肢がクイズの配列の選択肢の先頭だった場合に正解時のスタイルを選択肢に適用する。
   * 上記と異なる場合は、不正解時のスタイルを適用する。
   * Nextボタンを活性にする。
   */
  function checkAnswer(li) {
    // 解答し終えた場合、処理終了
    if (isAnswerd) {
      return;
    }

    isAnswerd = true;

    // 選択したli要素に表記されている値がクイズの選択肢の先頭だった場合
    if (li.textContent === quizSet[currentNum].choice[0]) {
      // li要素にcorrectクラスのスタイルを適用
      li.classList.add('correct');
      score++;
      // 選択したli要素に表記されている値がクイズの選択肢の先頭ではない場合
    } else {
      // li要素にwrongクラスのスタイルを適用
      li.classList.add('wrong');
    }
    // disabledクラスのスタイルを除去
    btn.classList.remove('disabled');
  }

  /**
   *
   * 【処理の内容】
   * 問題を画面に表示する。選択肢をシャッフルした後、画面に表示する。
   * クイズを全て解答し終えたらNextボタンの表記を'Show Score!'に変更する。
   * クイズの正答数を表示する。
   */
  function setQuiz() {
    isAnswerd = false;

    // クイズが格納された配列から問題を取得し、画面に表示
    question.textContent = quizSet[currentNum].quiz;

    // ul要素の子要素が存在する場合
    while (choices.firstChild) {
      // 子要素を削除
      choices.removeChild(choices.firstChild);
    }
    // クイズの選択肢を全て取り出して配列を生成した後、シャッフルする
    const shuffledChoices = shuffle([...quizSet[currentNum].choice]);

    // クイズの選択肢をli要素に設定し、クリックイベントを定義
    shuffledChoices.forEach((choice) => {
      const li = document.createElement('li');

      // クイズの選択肢をli要素に設定
      li.textContent = choice;

      li.addEventListener('click', () => {
        // li要素を押下した際に解答をチェック
        checkAnswer(li);
      });
      // ul要素の子要素としてli要素を追加
      choices.appendChild(li);
    });

    // クイズを全て解答し終えた場合
    if (currentNum === quizSet.length - 1) {
      // Nextボタンの表記を変更
      btn.textContent = 'Show Score!';
    }
  }

  setQuiz();

  // ボタンに対してクリックイベントを追加
  btn.addEventListener('click', () => {
    // ボタンが非活性の場合、処理終了
    if (btn.classList.contains('disabled')) {
      return;
    }
    // ボタンを非活性にする
    btn.classList.add('disabled');

    // クイズを全て解答し終えた場合
    if (currentNum === quizSet.length - 1) {
      // クイズの正答数を表示
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
      // sectionのクラスを除去
      result.classList.remove('hidden');
      // クイズが残っている場合
    } else {
      currentNum++;
      setQuiz();
    }
  });
}
