Code
---
```html
<yo-group>
  <yo-cell label="label">
    <el-input/>
  </yo-cell>
  <yo-cell label="label2">
    <el-input/>
  </yo-cell>
</yo-group>
```

yo-group
---
#### 属性

|属性名|类型|介绍|
|-|-|-|
|grid|number|指定每行单位数。无值时，自适应。可指定1～5。|

yo-cell
---

#### 属性

|属性名|类型|介绍|
|-|-|-|
|label|string|label显示值|
|span|number|占据格数，默认为1|
|important|boolean| 出现红色*号|