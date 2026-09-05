'use client';

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from '@/components/ui/input-group';
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from '@/components/ui/message-scroller';
import { timeSinceTimestamp } from '@/lib/util/utils';
import { Job } from '@/prisma/generated/client';
import { Message as ChatMessage } from '@/types';
import { useChat } from '@ai-sdk/react';
import React from 'react';
import { TbArrowUp, TbInfoCircle, TbMessageFilled } from 'react-icons/tb';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import { Field, FieldDescription } from './ui/field';

interface InteractiveResumeHandle {
  setPrompt: (prompt: string) => void;
}

interface InteractiveResumeProps {
  jobs: Job[];
  resumeFile: File | null;
}

const initialMessages: ChatMessage[] = [
  {
    id: new Date().getTime().toString(),
    role: 'assistant',
    parts: [
      {
        type: 'text',
        text: 'Hi there! I am your interactive resume assistant. I can help you answer questions about work experience, education, and how these skills translate to different roles. Ask a question to get started.',
      },
      { type: 'data-timestamp', data: new Date().toISOString() },
    ],
  },
];

const InteractiveResume = React.forwardRef<
  InteractiveResumeHandle,
  InteractiveResumeProps
>((props, ref) => {
  const { messages, sendMessage, status } = useChat<ChatMessage>({
    messages: [...initialMessages],
  });
  const [error, setError] = React.useState<string | null>(null);

  const formRef = React.useRef<HTMLFormElement>(null);
  const [query, setQuery] = React.useState('');

  const isBusy = status === 'submitted' || status === 'streaming';

  const handleSend = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (isBusy || !query) return;

    sendMessage({
      role: 'user',
      parts: [{ type: 'text', text: query }],
    });

    setQuery('');
  };

  React.useImperativeHandle(ref, () => ({
    setPrompt: (prompt: string) => {
      setQuery(prompt);
    },
  }));

  return (
    <MessageScrollerProvider autoScroll>
      <div className="flex h-full w-full flex-col p-2">
        <div className="flex-1 overflow-hidden">
          {messages.length === 0 ? (
            <Empty className="h-full">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <TbMessageFilled />
                </EmptyMedia>
                <EmptyTitle>Ready to Stream</EmptyTitle>
                <EmptyDescription>
                  Press send to stream a scripted launch summary.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <MessageScroller>
              <MessageScrollerViewport className="overscroll-y-auto">
                <MessageScrollerContent
                  aria-busy={isBusy}
                  className="p-(--card-spacing)"
                >
                  {messages.map((message) => (
                    <MessageAnimated key={message.id} message={message} />
                  ))}
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
          )}
        </div>
        <div className="w-full shrink-0 bg-background">
          <form ref={formRef} onSubmit={handleSend} className="w-full gap-2">
            <Field>
              <InputGroup className="focus-within:ring-1 focus-within:ring-ring">
                <InputGroupTextarea
                  id="query-textarea"
                  placeholder="Ask a question..."
                  rows={2}
                  required
                  className="min-h-15 resize-none border-none focus-visible:ring-0"
                  maxLength={280}
                  title="Maximum 280 characters"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      formRef.current?.dispatchEvent(
                        new Event('submit', {
                          bubbles: true,
                          cancelable: true,
                        })
                      );
                    }
                  }}
                />
                <InputGroupAddon align="block-end">
                  <InputGroupButton
                    variant="default"
                    size="sm"
                    className="ml-auto"
                    type="submit"
                  >
                    <TbArrowUp className="size-4" />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription className="mt-2 text-xs text-muted-foreground">
                <TbInfoCircle className="inline size-4! text-muted-foreground!" />{' '}
                AI can make mistakes, always verify the information provided.
              </FieldDescription>
            </Field>
          </form>
        </div>
      </div>
    </MessageScrollerProvider>
  );
});

InteractiveResume.displayName = 'InteractiveResume';
export default InteractiveResume;

const MessageAnimated: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const content =
    message.parts.find((part) => part.type === 'text')?.text ?? '';
  const timestamp =
    message.parts.find((part) => part.type === 'data-timestamp')?.data ??
    new Date();

  if (message.role === 'assistant') {
    return (
      <div className="flex w-full flex-col gap-1 py-4">
        {!content ? (
          <div className="flex h-6 items-center gap-1.5 px-2">
            <span className="size-2 animate-bounce rounded-full bg-primary/40 delay-100"></span>
            <span className="size-2 animate-bounce rounded-full bg-primary/60 delay-150"></span>
            <span className="size-2 animate-bounce rounded-full bg-primary/80 delay-200"></span>
          </div>
        ) : (
          <div className="prose prose-sm max-w-none text-pretty text-foreground dark:prose-invert prose-p:mb-2 prose-p:leading-relaxed prose-ul:my-2 prose-li:my-1">
            <ReactMarkdown
              skipHtml={true}
              remarkPlugins={[remarkGfm, remarkBreaks]}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
        <span className="text-[10px] text-muted-foreground/60">
          {timeSinceTimestamp(new Date(timestamp))}
        </span>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-end py-4">
      <div className="flex max-w-[85%] flex-col items-end gap-1">
        <div className="rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
          {content}
        </div>
        <span className="text-[10px] text-muted-foreground/60">
          {timeSinceTimestamp(new Date(timestamp))}
        </span>
      </div>
    </div>
  );
};
