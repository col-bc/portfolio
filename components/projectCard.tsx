import Image from 'next/image';
import Link from 'next/link';
import {
  TbBrandGithub,
  TbExternalLink,
  TbEye,
  TbEyeOff,
  TbStar,
  TbStarOff,
} from 'react-icons/tb';

import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ProjectWithImages } from '@/lib/project/projectDAL';
import { cn } from '@/lib/utils';
import { ProjectImage } from '@/prisma/generated/browser';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';

interface ProjectCardProps {
  project: ProjectWithImages;
  reverse?: boolean;
  showActions?: boolean;
}

export default function ProjectCard({
  project,
  reverse = false,
  showActions = false,
}: ProjectCardProps) {
  return (
    <Card
      className={cn(
        'flex w-full flex-col overflow-hidden p-0 transition-all hover:shadow-md',
        reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
      )}
    >
      {/* Carousel Container */}
      <div
        className={cn(
          'relative min-h-62.5 w-full shrink-0 bg-muted lg:min-h-87.5 lg:w-5/12',
          reverse
            ? 'border-b lg:border-b-0 lg:border-l'
            : 'border-b lg:border-r lg:border-b-0'
        )}
      >
        {project.images.length > 0 ? (
          <Carousel
            opts={{ loop: true }}
            className="absolute inset-0 h-full w-full [&_.overflow-hidden]:h-full"
          >
            <CarouselContent className="h-full">
              {/* Light box */}
              {project.images.map((image: ProjectImage, idx: number) => (
                <CarouselItem
                  key={`carousel-item-${idx}`}
                  className="relative h-full w-full"
                >
                  <Dialog>
                    <DialogTrigger className="group relative block h-full w-full cursor-zoom-in overflow-hidden border-none bg-transparent p-0 outline-none">
                      <Image
                        src={image.url}
                        alt={image.altText || `${project.title} screenshot`}
                        fill
                        className="h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/5" />
                    </DialogTrigger>

                    <DialogContent className="flex h-full max-h-screen! w-full! max-w-screen! items-center justify-center bg-transparent p-0">
                      <DialogTitle className="sr-only">
                        {image.altText || `${project.title} screenshot`}
                      </DialogTitle>

                      <div className="relative flex h-[80vh] w-full items-center justify-center">
                        <Image
                          src={image.url}
                          alt={image.altText || `${project.title} screenshot`}
                          fill
                          className="h-full w-full object-contain"
                          sizes="100vw"
                          quality={100}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </CarouselItem>
              ))}
            </CarouselContent>

            {project.images.length > 1 && (
              <>
                <CarouselPrevious className="absolute top-1/2 left-4 -translate-y-1/2 bg-background/80 backdrop-blur-sm" />
                <CarouselNext className="absolute top-1/2 right-4 -translate-y-1/2 bg-background/80 backdrop-blur-sm" />
              </>
            )}
          </Carousel>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <span className="text-sm text-muted-foreground">
              No images available
            </span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <CardHeader className="p-6 pb-4 lg:p-8 lg:pb-4">
            <div className="items center flex justify-between">
              <CardTitle className="font-heading text-2xl font-bold tracking-tight">
                {project.title}
              </CardTitle>
              {showActions && (
                <div className="flex gap-2">
                  <Badge variant="secondary" className="h-8 w-8 font-medium">
                    {project.visible ? (
                      <TbEye className="h-8! w-8!" />
                    ) : (
                      <TbEyeOff className="h-8! w-8!" />
                    )}
                  </Badge>
                  <Badge variant="secondary" className="h-8 w-8 font-medium">
                    {project.featured ? (
                      <TbStar className="h-8! w-8!" />
                    ) : (
                      <TbStarOff className="h-8! w-8!" />
                    )}
                  </Badge>
                  <Link
                    href={`/auth/manage/projects/${project.id}`}
                    className={buttonVariants({
                      variant: 'outline',
                      size: 'sm',
                    })}
                  >
                    Edit
                  </Link>
                </div>
              )}
            </div>
            <CardDescription className="mt-2 text-base leading-relaxed text-muted-foreground">
              {project.description}
            </CardDescription>
          </CardHeader>

          {project.tags.length > 0 && (
            <CardContent className="p-6 pt-0 lg:px-8 lg:pb-6">
              <div className="flex flex-wrap gap-2">
                {project.tags.split(',').map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="font-medium">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          )}
        </div>

        <CardFooter className="flex flex-wrap items-center gap-3 p-6 pt-0 lg:px-8 lg:pb-8">
          {project.link && (
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: 'default' }))}
            >
              <TbExternalLink className="mr-2" size={18} />
              Live Application
            </Link>
          )}
          {project.repository && (
            <Link
              href={project.repository}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: 'outline' }))}
            >
              <TbBrandGithub className="mr-2" size={18} />
              View Source
            </Link>
          )}
        </CardFooter>
      </div>
    </Card>
  );
}
