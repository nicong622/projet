import '~/lib/hammer.js'

/**
 * 把当前移动的元素与最近的日期元素左边对齐
 * @param el 当前移动的元素
 * @param left 元素的 left 属性值
 * @returns
 */
function alignEl(el: HTMLElement, left: number) {
  const dateBoxes = document.getElementsByClassName('timeline')[0].children
  const index = Math.floor(left / dateBoxes[0].clientWidth)
  const elFrom = dateBoxes[index]

  if (!(elFrom instanceof HTMLElement)) return

  el.style.left = `${elFrom.offsetLeft}px`
}

export default {
  mounted(el: HTMLElement) {
    const hammerInstance = new window.Hammer(el)
    let left = +el.style.left.replace('px', '')

    hammerInstance.on('pan', (ev) => {
      const newLeft = left + ev.deltaX
      el.style.left = `${newLeft}px`

      if (ev.isFinal) {
        alignEl(el, newLeft) // 对齐日期色块的左边
        left = +el.style.left.replace('px', '') // 保存对齐后的 left
      }
    })
  },
}
