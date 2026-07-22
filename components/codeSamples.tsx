'use client';

import codeSamples, { Sample } from '@/lib/codeSamples';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import React from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  oneDark,
  oneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface CodeHighlighterProps {
  language: string;
  code: string;
}

const CodeHighlighter: React.FC<CodeHighlighterProps> = ({
  language,
  code,
}) => {
  const { resolvedTheme } = useTheme();
  const style = React.useMemo(
    () => (resolvedTheme === 'dark' ? oneDark : oneLight),
    [resolvedTheme]
  );

  return (
    <div className="flex w-full flex-col gap-0! overflow-auto rounded-lg border border-border bg-background">
      {language && (
        <div className="flex items-center rounded-t-lg border-b border-border bg-muted px-4 py-2 text-sm font-semibold text-foreground">
          <span className="capitalize">{language}</span>
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={style}
        className="rounded-0! m-0! h-full max-h-150 w-full"
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

function CodeSamples() {
  return (
    <div className="flex w-full min-w-0 flex-col items-start gap-6">
      <h2 className="text-2xl font-bold tracking-tight underline decoration-primary decoration-2 md:text-3xl">
        Code Samples
      </h2>
      <p className="text-base leading-relaxed text-foreground">
        Explore various code samples demonstrating the capabilities of our
        application. Click on the tabs to view different examples and see how
        you can implement similar functionality in your projects.
      </p>

      <Tabs className="w-full">
        <TabsList
          variant="default"
          className="mb-0 flex items-center justify-start rounded-full border border-border"
        >
          {Object.entries(codeSamples).map(
            ([key, sample]: [string, Sample]) => (
              <TabsTrigger key={key} value={key} className="rounded-full">
                {sample.title}
              </TabsTrigger>
            )
          )}
        </TabsList>

        <div className="h-full w-full overflow-auto">
          {Object.entries(codeSamples).map(
            ([key, sample]: [string, Sample]) => (
              <TabsContent key={key} value={key}>
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  <p className="my-4 text-sm leading-relaxed text-muted-foreground">
                    {sample.description}
                  </p>

                  <CodeHighlighter
                    code={sample.code}
                    language={sample.language}
                  />
                </motion.div>
              </TabsContent>
            )
          )}
        </div>
      </Tabs>
    </div>
  );
}

export default CodeSamples;
