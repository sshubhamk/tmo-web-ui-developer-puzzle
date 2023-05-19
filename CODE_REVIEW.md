#### **Automatic Scan Accessibility Issues**

- `Fixed` Accessible name is not available for buttons.
- `Fixed` Foreground and Background colors do not have a sufficient contrast ratio.

---

#### **Manual Scan Accessibility Issues**

- `Added` aria-label for drawer toggle and close button.

  (`app.component.html`)

- `Added` aria-label and disabled attribute for the want to read, search and remove button.

  (`book-search.component.html`) (`reading-list.component.html`)

- `Added` **alt** attribute which is missing for image tag.

  (`reading-list.component.html`)

---

#### **Code Smells & Improvements**

- `Added` Unit testcase failing for `failedRemoveFromReadingList` and `failedAddToReadingList`.

  (`reading-list.reducer.ts`)

- `Added` type for `removeFromReadingList` method argument.

  (`reading-list.component.ts`)
