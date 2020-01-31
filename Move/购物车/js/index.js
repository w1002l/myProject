window.onload = function () {

  var table = document.querySelector('table');   // 表格
  var allItem = table.querySelectorAll('.all-item');  // 全选按钮
  var items = table.querySelectorAll('.item');   // 单选框
  var trs = table.children[1].rows;  // 选择 tbody 里面的所有行， rows 仅对表格生效
  var deleteSelected = document.querySelector('.delete-selected-item');  // 删除所选按钮
  var TotalNum = document.querySelector('.total-num').querySelector('strong');   // 数量总计
  var TotalMoney = document.querySelector('.total-money').querySelector('strong');  // 价格总计
  var clickToggle = document.querySelector('.total-num');
  var goodsList = document.querySelector('.goods-list');
  var onOff = true;

  // total();
  // 全选功能实现
  for (var j = 0; j < allItem.length; j++) {
    allItem[j].addEventListener('click', function () {
      for (var i = 0; i < items.length; i++) {
        items[i].checked = this.checked;
      }
    })
  }
  // 根据所有复选框是否选中，决定全选框是否选中
  for (var i = 0; i < items.length; i++) {
    flag = true;
    items[i].addEventListener('click', function () {
      for (var i = 0; i < items.length; i++) {
        if (!items[i].checked) {
          flag = false;
          break;
        } else {
          flag = true;
        }
      }
      for (var j = 0; j < allItem.length; j++) {
        allItem[j].checked = flag;
      }
      show();   // 商品添加函数
      total()   // 合计函数
    })
  }
  // 删除某一个商品功能
  for (var i = 0; i < trs.length; i++) {
    trs[i].addEventListener('click', function (e) {
      var e = e || window.event;
      var curTarget = event.target || event.srcElement;
      if (curTarget.className == 'delete-item') {
        var conf = confirm('确定删除此项商品吗 ?');
        if (conf) {
          this.parentNode.removeChild(this);
        }
      }
      total();
    })
  }
  // 删除所选商品功能
  deleteSelected.addEventListener('click', function () {
    if (TotalNum.innerHTML != 0) {
      var conf = confirm('确定删除所选商品吗 ?');
      if (conf) {
        for (var i = 0; i < trs.length; i++) {
          var inp = trs[i].querySelector('input');
          if (inp.checked) {
            trs[i].parentNode.removeChild(trs[i]);
            i--;
          }
        }
      }
      total();
    }

  })

  // 点击增加或减少按钮，改变商品数量，同时相应改变小计、总计及已选商品的内容
  for (var i = 0; i < trs.length; i++) {
    changeNum(trs[i]);
  }

  // 数目改变函数
  function changeNum(Ele) {
    var decrease = Ele.querySelector('.decrease');    // 减少按钮
    var increase = Ele.querySelector('.increase');    // 增加按钮
    var textNum = Ele.querySelector('.nums');
    var unitPrice = Ele.querySelector('.unit-price');
    var textMoney = Ele.querySelector('strong');
    var nums = parseInt(textNum.value);             // 商品数量
    var price = parseFloat(unitPrice.innerHTML);    // 商品单价
    var Money = parseFloat(textMoney.innerHTML);    // 商品价格
    increase.addEventListener('click', function () {
      var tr = this.parentNode.parentNode;
      var inp = tr.getElementsByTagName('input')[0];
      inp.checked = true;
      nums++;
      textNum.value = nums;
      Money = nums * price;
      Money = Money.toFixed(2);
      textMoney.innerHTML = parseFloat(Money);
      total();
    })
    decrease.addEventListener('click', function () {
      nums--;
      if (nums <= 1) {
        nums = 1;
      }
      textNum.value = nums;
      Money = nums * price;
      Money = Money.toFixed(2);
      textMoney.innerHTML = parseFloat(Money);
      total();
    })
  }
  // 总计（数目、价格）函数
  function total() {
    var sum = 0;
    var temp = 0;
    for (var i = 0; i < trs.length; i++) {
      // 复选框选中，才执行总计
      if (trs[i].getElementsByTagName('input')[0].checked) {
        var textNum = trs[i].querySelector('.nums');
        var textMoney = trs[i].querySelector('strong');
        sum += parseInt(textNum.value);
        temp += parseFloat(textMoney.innerHTML);
      }
    }
    TotalNum.innerHTML = sum;
    temp = temp.toFixed(2);
    TotalMoney.innerHTML = temp;
  }

  // 点击显示/隐藏已选商品展示模块
  clickToggle.addEventListener('click', function () {
    if (onOff) {
      this.className = 'arrow-down';
      goodsList.style.display = 'block';
      onOff = false;
    } else {
      this.className = 'arrow-up';
      goodsList.style.display = 'none';
      onOff = true;
    }
  })

  // 把选中的商品添加到展示模块
  function show() {
    var html = '';
    for (var i = 0; i < trs.length; i++) {
      if (trs[i].getElementsByTagName('input')[0].checked) {
        html += '<li>' +
          '<img src="' + trs[i].getElementsByTagName('img')[0].src + '" >' +
          '<a class="del" index="' + i + '" href="javascript:;">取消选择</a>' +
          '</li>';
      }
    }
    goodsList.innerHTML = html;
  }
  // 点击商品展示栏的取消选择按钮，把对应商品移除
  goodsList.addEventListener('click', function (e) {
    var e = e || window.event;
    var curTarget = e.target || e.srcElement;
    if (curTarget.className == 'del') {
      var input = trs[curTarget.getAttribute('index')].getElementsByTagName('input')[0]
      // 商品对应行中的复选框设置为不选中
      input.checked = false;
      // 调用商品添加函数把商品从展示模块移除
      input.addEventListener('click', show());
    }
  })
}

