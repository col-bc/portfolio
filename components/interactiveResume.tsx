'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { timeSinceTimestamp } from '@/lib/util/utils';
import { Job } from '@/prisma/generated/client';
import { Message as ChatMessage } from '@/types';
import { useChat } from '@ai-sdk/react';
import React from 'react';
import {
  TbAlertCircleFilled,
  TbArrowUp,
  TbInfoCircle,
  TbMessageFilled,
  TbRotateClockwise,
  TbUserFilled,
} from 'react-icons/tb';
import ReactMarkdown from 'react-markdown';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Bubble, BubbleContent } from './ui/bubble';
import { Field, FieldDescription } from './ui/field';
import { Message, MessageAvatar, MessageContent } from './ui/message';

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
  const { jobs, resumeFile } = props;

  const { messages, sendMessage, setMessages, status } = useChat<ChatMessage>({
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
      <div className="relative flex flex-col gap-4">
        <Card className="h-164 min-h-full w-full max-w-xl gap-0 shadow">
          <CardHeader className="gap-1 border-b">
            <div className="relative w-auto">
              <CardTitle>Resume Assistant</CardTitle>
              <Badge
                variant="default"
                className="absolute top-0 right-0 bg-chart-2 font-mono text-[10px]"
              >
                BETA
              </Badge>
            </div>
            <CardDescription>
              Get quick answers about work experience, education, and skills as
              they relate to different roles.
            </CardDescription>
            <CardAction>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Reset stream"
                      onClick={() => setMessages(initialMessages)}
                      disabled={messages.length === 0 || isBusy}
                    >
                      <TbRotateClockwise />
                    </Button>
                  }
                />
                <TooltipContent>
                  <p>Reset</p>
                </TooltipContent>
              </Tooltip>
            </CardAction>
            {error && (
              <Alert role="alert" className="my-2">
                <TbAlertCircleFilled className="size-4! text-destructive!" />
                <AlertTitle>Assistant Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0">
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
                <MessageScrollerViewport>
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
          </CardContent>
          <CardFooter className="w-full">
            <form ref={formRef} onSubmit={handleSend} className="w-full gap-2">
              <Field>
                <InputGroup>
                  <InputGroupTextarea
                    id="query-textarea"
                    placeholder="Ask a question..."
                    rows={3}
                    required
                    className="resize-none"
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
                <FieldDescription className="text-xs text-muted-foreground">
                  <TbInfoCircle className="inline size-4! text-muted-foreground!" />{' '}
                  AI powered assistant can make mistakes. Always verify the
                  information provided.
                </FieldDescription>
              </Field>
            </form>
          </CardFooter>
        </Card>
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
      <div className="flex flex-col gap-0.5">
        {!content ? (
          <div className="flex h-5 items-center gap-1 py-1">
            <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground delay-100"></span>
            <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground delay-150"></span>
            <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground delay-200"></span>
          </div>
        ) : (
          <div className="prose prose-sm dark:prose-invert prose-p:leading-relaxed prose-p:mb-3 prose-ul:my-2 prose-li:my-1 max-w-none text-sm text-pretty text-foreground">
            <ReactMarkdown skipHtml={true}>{content}</ReactMarkdown>
          </div>
        )}
        <label className="text-xs text-muted-foreground">
          {timeSinceTimestamp(new Date(timestamp))}
        </label>
      </div>
    );
  }

  return (
    <Message align="end">
      <MessageAvatar>
        <Avatar>
          <AvatarFallback>
            <TbUserFilled className="size-6" />
          </AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <Bubble variant="tinted">
          <BubbleContent className="text-sm text-pretty">
            {content}
          </BubbleContent>
          <label className="text-xs text-muted-foreground">
            {timeSinceTimestamp(new Date(timestamp))}
          </label>
        </Bubble>
      </MessageContent>
    </Message>
  );
};
