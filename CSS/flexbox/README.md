弹性盒子是一种用于按行或按列布局元素的一维布局方法。元素可以膨胀以填充额外的空间，收缩以适应更小的空间。
##### 为什么是弹性盒子？
  长久以来，css布局中唯一可以跨浏览器兼容的创建工具只有floats和positioning。这两个工具大部分情况下都很好使，但是在某些方面他们有一些局限性。
  比如下面这样的情况：
    3.使多列布局中的所有列采用相同的高度，即是它们包含的内容量不同。
    1.在父内容里面垂直居中一个块内容。
    2.使容器的所有子项占用等量的可用宽度、高度，而不管有多少宽度、高度可用。

  // 设置子元素最小为200px，否则换行，剩余的均分
  .father{
    display: flex;
  }
  .son{
    flex: 1 200px;
  }

##### 列还是行？
  弹性盒子提供了flex-direction这样的属性，它可以指定主轴的方向(弹性盒子子类放置的地方)——它默认值是row，这使得它们在按我们浏览器默认语言方向排成一排(在英语、汉语浏览器中是从左到右)。
  flex-direction: row, column, row-reverse, column-reverse。四个属性。默认值是row。

  
##### 换行
  当元素数量增加时，会压缩每个子元素的宽、高，可能造成变形，此时需要在:
    父元素增加 flex-wrap: wrap;
    子元素增加 flex: 200px;
  这样就可以保证子元素最小宽度为200px，否则换行。

  flex-flow缩写
    flex-direction和flex-wrap的缩写是flex-flow。
      可以将：flex-direction: row; flex-wrap: wrap;
      替换为：flex-flow: row wrap;

  flex: 缩写与全写
    flex是一个可以指定最多三个不同值的缩写属性：
      1.第一个是无单位比例。可以单独指定全写flex-grow属性的值。
      2.第二个无单位比例 flex-shrink ,一般用于溢出容器的flex项。这指定了从每个flex项中取出多少溢出量，以阻止他们溢出的容器。这是一个相当高级的弹性盒子功能。
      3.第三个是最小值，可以单独指定全写flex-basis属性的值。
    建议不要使用全写，除非真的需要(比如去覆盖之前写的)。使用全写会多很多代码，它们可能让人困惑。


##### 水平对齐和垂直对齐
  .father{
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  就可以实现垂直水平居中。
    align-items控制flex项在交叉轴上的位置：
      1.默认值是stretch，其会使所有flex项沿着交叉轴的方向拉伸以填充父容器。如果父容器在交叉轴方向上没有固定宽度(及高度)，则所有flex项将变的与最长的flex项一样长(及高度保持一致)。我们在第一个例子在默认情况下得到相同高度的列的原因。
      2.在上面规则中我们使用center值会使这些项保持原有高度，但是会在交叉轴居中，这就是那些按钮垂直居中的原因(demo04.html);
      3.也可以设置诸如flex-start或flex-end这样使flex项在交叉轴的开始或结束处对齐所有的值。
  可以使用align-self属性覆盖align-item的行为。比如：
    button:first-child{
      align-self: flex-end;
    }

  justify-content控制flex项在主轴上的位置：
    1.默认值是flex-start，这会使所有flex项都位于主轴的开始处。
    2.也可以用flex-end，来让flex项到结束尾处。
    3.center在justify-content里也是可用的，可以让flex项在主轴居中。
    4.我们上面用到的值space-around是很有用的——它会使所有flex项沿着主轴均匀地分布，在任意一端都会留有一点空间。
    5.还有一个值是space-between，它和space-around非常相似，只是它不会再两端留下任何空间。

### flex项排序
  弹性盒子也可以改变flex项的布局位置功能，而不会影响到源顺序(及dom树里元素的顺序)。这也是传统布局很难做到的一点。
  代码，如下：
    button:first-child{
      order: 1
    }
  刷新后，会发现“Smile”按钮到了轴末尾了.(demo04.html)
    1.所有flex项默认的order值是0.
    2.order值打的flex项比order值小的显示的更靠后。
    3.相同order的flex项按顺序显示。
    4.第三个元素显示在第二个后面是因为它们的order值相同。
  也可以给order设置负值，使它比值0的更靠前。比如设置“Blush”按钮：
    button:last-child{
      order: -1;
    }

##### flex还可以嵌套使用
