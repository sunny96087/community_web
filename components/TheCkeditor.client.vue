<template>
  <div>
    <ckeditor
      :editor="ClassicEditor"
      v-model="internalData"
      @blur="handleBlur"
      :config="editorConfig"
    >
    </ckeditor>
  </div>
</template>

<script setup>
import CKEditor from '@ckeditor/ckeditor5-vue'
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic'
import { FontSize, FontFamily, FontColor, FontBackgroundColor } from '@ckeditor/ckeditor5-font'
import { Bold, Italic, Underline, Strikethrough } from '@ckeditor/ckeditor5-basic-styles'
import { Link } from '@ckeditor/ckeditor5-link'
import { Paragraph } from '@ckeditor/ckeditor5-paragraph'
import { Essentials } from '@ckeditor/ckeditor5-essentials'
import { LinkImage } from '@ckeditor/ckeditor5-link'

import Image from '@ckeditor/ckeditor5-image/src/image'
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar'
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption'
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle'
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize'

import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert'
import ImageInsertUI from '@ckeditor/ckeditor5-image/src/imageinsert/imageinsertui'
import AutoImage from '@ckeditor/ckeditor5-image/src/autoimage'
import ImageResizeEditing from '@ckeditor/ckeditor5-image/src/imageresize/imageresizeediting'
import ImageResizeHandles from '@ckeditor/ckeditor5-image/src/imageresize/imageresizehandles'
import ImageTextAlternative from '@ckeditor/ckeditor5-image/src/imagetextalternative'

// import { AutoImage } from '@ckeditor/ckeditor5-image';

// import { LinkImage } from '@ckeditor/ckeditor5-link/src/linkimage'

const ckeditor = defineComponent(CKEditor.component)
const editorData = ref('content of the editor')

const props = defineProps({
  modelValue: String
})
const emit = defineEmits(['update:modelValue'])
const internalData = ref('') // 初始化為空字符串，或可以設定為 props.modelValue 初始值

onMounted(() => {
  internalData.value = props.modelValue || '' // 提供一個更友好的預設值
})

// watch(() => props.modelValue, (newValue) => {
//   if (newValue !== internalData.value) {
//     internalData.value = newValue;
//   }
// }, { immediate: true })

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== internalData.value) {
      internalData.value = newValue
    }
  },
  { immediate: true, flush: 'post' }
) // 確保在 DOM 更新後執行

watch(
  internalData,
  (newValue) => {
    if (newValue !== props.modelValue) {
      emit('update:modelValue', newValue)
    }
  },
  { immediate: true }
)

function handleBlur() {
  // 處理失焦事件
  console.log('Editor has been blurred')
  // 可以在這裡添加你的邏輯，比如發送數據到伺服器
}

const editorConfig = {
  placeholder: '輸入內文...',
  plugins: [
    FontSize,
    FontFamily,
    FontColor,
    FontBackgroundColor,
    Bold,
    Italic,
    Underline,
    Strikethrough,
    Link,
    LinkImage,
    Image,
    ImageToolbar,
    ImageCaption,
    ImageStyle,
    ImageResize,
    ImageInsert,
    ImageInsertUI,
    ImageResizeEditing,
    ImageResizeHandles,
    ImageTextAlternative,
    AutoImage,
    Paragraph,
    Essentials
  ],
  toolbar: {
    items: [
      'fontSize',
      'fontFamily',
      'fontColor',
      'fontBackgroundColor',
      '|',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      '|',
      'link',
      '|',
      'insertImage',
      '|',
      // 'imageStyle:full',
      // 'imageStyle:side',
      // '|',
      // 'imageTextAlternative',
      // '|',
      'undo',
      'redo',
      '|'
    ],
    shouldNotGroupWhenFull: true // RWD 自動換行
  },
  image: {
    // 配置图像相关选项
    toolbar: [
      'imageStyle:full',
      // 'imageStyle:side',
      'imageStyle:alignLeft',
      'imageStyle:alignCenter',
      'imageStyle:alignRight',
      '|',
      'imageTextAlternative'
    ],
    styles: ['full', 'side'],
    // insert: {
    //   integrations: ['insertImageViaUrl']
    // }
  },
  fontSize: {
    // 自訂義字級選項
    options: [12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32]
  },
  link: {
    // 點擊連結另起新分頁
    addTargetToExternalLinks: true
  }
}
</script>

<style scoped>
.ck-content .image-style-align-left {
  float: left;
  margin-right: 1em;
}

.ck-content .image-style-align-center {
  margin: 1em auto;
}

.ck-content .image-style-align-right {
  float: right;
  margin-left: 1em;
}
</style>
