'use client';

import codeSamples, { CodeSample } from '@/lib/codeSamples';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

import {
  vs,
  vscDarkPlus,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

const AsyncSyntaxHighlighter = dynamic(
  () => import('react-syntax-highlighter').then((mod) => mod.Prism),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-64 w-full flex-col gap-3 p-4">
        <div className="h-4 w-3/4 animate-pulse rounded-md bg-muted/60" />
        <div className="h-4 w-1/2 animate-pulse rounded-md bg-muted/60" />
        <div className="h-4 w-5/6 animate-pulse rounded-md bg-muted/60" />
        <div className="h-4 w-2/3 animate-pulse rounded-md bg-muted/60" />
        <div className="h-4 w-1/3 animate-pulse rounded-md bg-muted/60" />
      </div>
    ),
  }
);

const CodeHighlighter = React.memo((sample: CodeSample) => {
  const { resolvedTheme } = useTheme();
  const style = React.useMemo(
    () => (resolvedTheme === 'dark' ? vscDarkPlus : vs),
    [resolvedTheme]
  );

  return (
    <div className="mb-1 flex w-full flex-col gap-0! overflow-auto rounded-lg border border-border bg-background shadow-sm!">
      <div className="flex w-full items-center gap-2 rounded-t-lg border-b border-border bg-muted px-4 py-2 font-semibold text-foreground">
        {sample.icon && (sample.icon as React.ReactNode)}
        <span className="font-mono">{sample.fileName}</span>
      </div>

      <div className="overflow-hidden">
        <AsyncSyntaxHighlighter
          language={sample.language}
          style={style}
          className="rounded-0! m-0! h-full max-h-150 w-full"
        >
          {sample.code}
        </AsyncSyntaxHighlighter>
      </div>
    </div>
  );
});
CodeHighlighter.displayName = 'CodeHighlighter';

function CodeSamples() {
  const sampleKeys = Object.keys(codeSamples);
  const defaultTab = sampleKeys[0];
  const [activeTab, setActiveTab] = useState(defaultTab);

  const activeIndex = sampleKeys.indexOf(activeTab);

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="flex w-full flex-col"
    >
      <TabsList className="h-auto max-w-full justify-start overflow-x-auto overflow-y-hidden">
        {Object.entries(codeSamples).map(
          ([key, sample]: [string, CodeSample]) => {
            const isActive = activeTab === key;

            return (
              <TabsTrigger key={key} value={key} className="px-6 py-1.5!">
                {isActive && (
                  <motion.div
                    layoutId="active-tab-indicator"
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{sample.title}</span>
              </TabsTrigger>
            );
          }
        )}
      </TabsList>

      <div className="relative w-full overflow-hidden pt-4">
        <motion.div
          className="flex w-full"
          initial={false}
          animate={{ x: `-${activeIndex * 100}%` }}
          transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
        >
          {Object.entries(codeSamples).map(
            ([key, sample]: [string, CodeSample]) => (
              <div key={key} className="w-full shrink-0 px-1 text-sm">
                <p className="mb-4 leading-relaxed text-muted-foreground">
                  {sample.description}
                </p>

                <CodeHighlighter {...sample} />
              </div>
            )
          )}
        </motion.div>
      </div>
    </Tabs>
  );
}

export default CodeSamples;
