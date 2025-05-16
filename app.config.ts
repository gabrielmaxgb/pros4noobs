export default defineAppConfig({
  ui: {
    modal: {
      slots: {
        overlay: 'fixed inset-0 bg-elevated/75',
        content:
          'fixed bg-internal-black border-primary/40 border-[1px] divide-y divide-default flex flex-col focus:outline-none',
        header: 'flex items-center gap-1.5 p-4 sm:px-6 min-h-16',
        wrapper: '',
        body: 'flex-1 overflow-y-auto p-4 sm:p-6',
        footer: 'flex items-center gap-1.5 p-4 sm:px-6',
        title: 'text-highlighted font-semibold',
        description: 'mt-1 text-muted text-sm',
        close: 'absolute top-4 end-4',
      },
      variants: {
        transition: {
          true: {
            overlay:
              'data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in]',
            content:
              'data-[state=open]:animate-[scale-in_200ms_ease-out] data-[state=closed]:animate-[scale-out_200ms_ease-in]',
          },
        },
        fullscreen: {
          true: {
            content: 'inset-0',
          },
          false: {
            content:
              'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-2rem)] max-w-lg max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] rounded-lg shadow-lg ring ring-default',
          },
        },
      },
    },
    toast: {
      slots: {
        root: 'relative group overflow-hidden bg-default shadow-lg rounded-lg ring ring-default p-4 flex gap-2.5 focus:outline-none',
        wrapper: 'w-0 flex-1 flex flex-col',
        title: 'text-sm font-medium text-highlighted',
        description: 'text-sm text-muted',
        icon: 'shrink-0 size-5',
        avatar: 'shrink-0',
        avatarSize: '2xl',
        actions: 'flex gap-1.5 shrink-0',
        progress: 'absolute inset-x-0 bottom-0 h-1 z-[-1]',
        close: 'p-0',
      },
      variants: {
        color: {
          primary: {
            root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
            icon: 'text-primary',
            progress: 'bg-primary',
          },
          secondary: {
            root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary',
            icon: 'text-secondary',
            progress: 'bg-secondary',
          },
          success: {
            root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success',
            icon: 'text-success',
            progress: 'bg-success',
          },
          info: {
            root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info',
            icon: 'text-info',
            progress: 'bg-info',
          },
          warning: {
            root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning',
            icon: 'text-warning',
            progress: 'bg-warning',
          },
          error: {
            root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error',
            icon: 'text-error',
            progress: 'bg-error',
          },
          neutral: {
            root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted',
            icon: 'text-highlighted',
            progress: 'bg-inverted',
          },
        },
        orientation: {
          horizontal: {
            root: 'items-center',
            actions: 'items-center',
          },
          vertical: {
            root: 'items-start',
            actions: 'items-start mt-2.5',
          },
        },
        title: {
          true: {
            description: 'mt-1',
          },
        },
      },
      defaultVariants: {
        color: 'primary',
      },
    },
  },
});
