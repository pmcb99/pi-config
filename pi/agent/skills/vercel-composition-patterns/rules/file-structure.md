Organise by **feature**, not by file type across the whole app. A screen or page must have a composable format like 

<Composer.Frame>
  <Composer.Header />
  <Composer.Input />
  <Composer.Footer>
    <Composer.Formatting />
    <Composer.Submit />
  </Composer.Footer>
</Composer.Frame>

rather than prop drilling or more than 300 lines of code. We can group related components into a single file to avoid having excessive files. Check other rules for more info on how to do that.

```txt
features/
  notes/
    screens/
      NotesScreen.tsx
    hooks/
      useNotesScreen.ts
      useNotesFilters.ts
      useNotesActions.ts
      useAiComposer.ts
      useNotesDiagnostics.ts
    components/
      NotesHeader.tsx
      NotesList.tsx
      NotesGrid.tsx
      NotesSplitView.tsx
      NotesEmptyState.tsx
      NotesLoadingState.tsx
      NotesErrorState.tsx
      SortOptionsModal.tsx
    services/
      noteItemMapper.ts
      notesDate.ts
      notesDisplay.ts
      notesDiagnostics.ts
    types/
      notes-screen.types.ts
```

Use this split:

* **screens**: orchestration only; route params, hook calls, top-level layout
* **hooks**: stateful business logic; filtering, sorting, actions, AI, subscriptions
* **components**: presentation only; render UI from props
* **services**: pure helpers or side-effect wrappers; mapping, date parsing, display shaping
* **types**: shared feature contracts

Rules:

* one file = one reason to change
* move any JSX block over ~300 lines into a component
* move filtering/sorting/grouping into hooks or services
* move async actions into hooks
* use explicit variants like `NotesGrid` and `NotesSplitView` instead of boolean props like `isGrid`
* keep shared global folders only for truly reusable primitives like `Button`, `TextField`, `Modal`
