class CMMarkDownMap {
  insertAround (doc, start, end) {
    const cursor = doc.getCursor()
    if (doc.somethingSelected()) {
      const selection = doc.getSelection()
      doc.replaceSelection(start + selection + end)
    } else {
      // If no selection then insert start and end args and set cursor position between the two.
      doc.replaceRange(start + end, { line: cursor.line, ch: cursor.ch })
      doc.setCursor({ line: cursor.line, ch: cursor.ch + start.length })
    }
  }

  insertBefore (doc, insertion, cursorOffset) {
    const cursor = doc.getCursor()

    if (doc.somethingSelected()) {
      var selections = doc.listSelections()
      selections.forEach((selection) => {
        var pos = [selection.head.line, selection.anchor.line].sort()

        for (var i = pos[0]; i <= pos[1]; i++) {
          doc.replaceRange(insertion, { line: i, ch: 0 })
        }

        doc.setCursor({ line: pos[0], ch: cursorOffset || 0 })
      })
    } else {
      doc.replaceRange(insertion, { line: cursor.line, ch: 0 })
      doc.setCursor({ line: cursor.line, ch: cursorOffset || 0 })
    }
  }

  markdownKeys () {
    return {
      'Ctrl-B': (cm) => {
        this.insertAround(cm, '**', '**')
      },
      'Ctrl-I': (cm) => {
        this.insertAround(cm, '*', '*')
      },
      'Ctrl-\'': (cm) => {
        this.insertBefore(cm, '>', '2')
      },
      'Ctrl-,': (cm) => {
        this.insertBefore(cm, '1. ', 3)
      },
      'Ctrl-.': (cm) => {
        this.insertBefore(cm, '* ', 2)
      },
      'Ctrl-H': (cm) => {
        const cursor = cm.getCursor()
        cm.replaceRange('---', { line: cursor.line, ch: cursor.ch })
      },
      'Ctrl-K': (cm) => {
        this.insertAround(cm, '[', '](http://)')
      }
    }
  }
}

const markdownKeys = new CMMarkDownMap()
export default markdownKeys
