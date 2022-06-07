module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    //规则配置https://cloud.tencent.com/developer/section/1135855
    'generator-star-spacing': 'off',
    'array-bracket-spacing': ["error", "never"],//数组内容和内容1个空格，边界不需要空格['1', '2']并修复；
    'array-element-newline': ["error", "never"],//数字内容换行的时候报错并修复；
    'array-callback-return': "error",//数组的form/every/filter/find/findIndex/reduce/reduceRight/some/sort没有return的时候报错；
    'block-scoped-var':"error",//变量在定义块的外部使用时，规则会生成警告
    'complexity': ["error", 30],//循环复杂度测量程序源代码中线性独立路径的数量
    'for-direction': "error",//无限循环代码报错
    'func-call-spacing': ["error", "never"],//调用的方法前边不允许有空格并修复
    'func-name-matching': ["error", "never"],//函数名称与它们所分配的变量或属性的名称相匹配
    'eqeqeq': ["error", "smart"],//运算规则符号===/!==校验
    'lines-between-class-members': ["error", "always"],//同一个class方法中间空行
    'max-depth': ["error", 4],//最深的层级，其他可以另写方法
    'max-lines': ["error", 500],//单个文件的最大500行
    'max-params': ["error", 4],//单个方法的入参数4个限制
    'max-statements-per-line': ["error", { "max": 2 }],//每行允许有几个方法
    'multiline-comment-style': ["error", "starred-block"],//多行代码注释（starred-block，bare-block）并且自动修复
    'no-bitwise': "error",//运算符检查'||',error'|'
    'no-else-return': "error",//if有return else不需要使用并且自动修复
    'no-empty': "error",//方法块里边没有执行其他语句
    'no-empty-function': "error",//空方法报错
    'no-lonely-if': "error",//如果一个if陈述是该else块中唯一的陈述，那么使用一个else if表格通常会更清晰
    // 'no-magic-numbers': "error",//代码中多次出现的数字，没有明确的含义。它们应该最好由命名常量替换.
    // 'no-mixed-operators': ["error", {"allowSamePrecedence": true}],
    'no-mixed-spaces-and-tabs': "error",//不允许使用混合空格和制表符进行缩进
    'no-multiple-empty-lines': ["error", { "max": 1, "maxEOF": 1 }],//允许文件结尾处强制执行最大数量的连续空1行并且自动修复
    'no-nested-ternary': "error",//规则不允许嵌套的三元表达式
    'no-template-curly-in-string': "error",//它会在发现一个包含模板文字 place holder（${something}）的字符串时发出警告
    'no-trailing-spaces': "error",//不允许在行尾添加尾随空白git对比差异产生冲突，自动修复
    'no-unreachable': "error",//不允许可达代码后return，throw，continue，和break语句
    'no-unused-vars': "error",//代码中任何地方声明和不使用的变量很可能是由于重构不完全导致的错误
    'no-useless-concat': "error",//标记2个文字的连接，当它们可以合并成一个文字时
    'no-var': "error",//阻止var使用或鼓励改为使用const或let,并且自动修复
    'require-await':"error",//警告不具有await表达式的异步函数
    // "require-jsdoc": ["error", {
    //     "require": {
    //         "FunctionDeclaration": true,
    //         "MethodDefinition": false,
    //         "ClassDeclaration": false,
    //         "ArrowFunctionExpression": false,
    //         "FunctionExpression": false
    //     }
    // }],//要求所有api函数都使用 JSDoc 注释来解释函数行为
    'semi-spacing': ["error", { "before": false, "after": true }],//防止在表达式中使用分号之前的空格。
    'space-after-keywords': ["error", "never"],//关键词后边添加空格
    'space-before-blocks': ["error", "always"],//blocks块必须至少有一个先前的空间
    'space-before-function-paren': ["error", "never"],//关键字与开始参数之间不允许有空格,匿名函数的关键字之后可能需要一个空格并且自动修复
    'spaced-comment': ["error", "always", { "block": { "balanced": true } }],//强制间距的一致性//或/*
    'template-curly-spacing': "error",//模板文字内部空间的一致性
    'no-alert':  process.env.NODE_ENV === 'production' ? "error": 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'indent': ['off', 2]
  }
}
