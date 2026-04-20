"use client";

import { logoutAdmin, verifySession } from "@/app/lib/handleAuth";
import { ColorModeButton } from "@/components/ui/color-mode";
import { Tooltip } from "@/components/ui/tooltip";
import {
    Box,
    Button,
    Collapsible,
    Container,
    Flex,
    IconButton,
    Menu,
    Portal,
    Skeleton,
    Spinner,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
    TbBriefcase2,
    TbBrowser,
    TbFlag,
    TbHome,
    TbLockOpen,
    TbLogout,
    TbMenu,
    TbMessage,
    TbSchool,
    TbSend,
    TbX,
} from "react-icons/tb";

/**
 * Renders the navigation links for the navbar.
 * Highlights the current path based on the pathname.
 * @returns JSX.Element
 */
function NavLinks() {
    const pathname = usePathname();

    /**
     * Determines if the given href matches the current pathname, accounting for potential hash fragments.
     * @param href - The href to compare against the current pathname.
     * @returns {boolean} True if the href matches the current pathname, false otherwise.
     */
    const isCurrentPath = (href: string) =>
        pathname === href ||
        (href.includes("#") && pathname.startsWith(href.split("#")[0]));

    return (
        <>
            <NextLink href="/">
                <Button
                    variant="ghost"
                    spaceX={2}
                    justifyContent={{ base: "left", md: "center" }}
                    color={isCurrentPath("/") ? "cyan.fg" : "inherit"}
                    w={{ base: "100%", md: "auto" }}>
                    <TbHome />
                    <span>Home</span>
                </Button>
            </NextLink>
            <NextLink href="/education">
                <Button
                    variant="ghost"
                    spaceX={2}
                    justifyContent={{ base: "left", md: "center" }}
                    color={isCurrentPath("/education") ? "cyan.fg" : "inherit"}
                    w={{ base: "100%", md: "auto" }}>
                    <TbSchool />
                    <span>Education</span>
                </Button>
            </NextLink>
            <NextLink href="/employment">
                <Button
                    variant="ghost"
                    spaceX={2}
                    justifyContent={{ base: "left", md: "center" }}
                    color={isCurrentPath("/employment") ? "cyan.fg" : "inherit"}
                    w={{ base: "100%", md: "auto" }}>
                    <TbBriefcase2 />
                    <span>Employment</span>
                </Button>
            </NextLink>
            <NextLink href="/contact">
                <Button
                    variant="ghost"
                    spaceX={2}
                    justifyContent={{ base: "left", md: "center" }}
                    color={isCurrentPath("/contact") ? "cyan.fg" : "inherit"}
                    w={{ base: "100%", md: "auto" }}>
                    <TbMessage />
                    <span>Contact</span>
                </Button>
            </NextLink>
        </>
    );
}

/**
 * Renders the action buttons for the navbar, including the color mode toggle,
 * contact button, and admin panel menu if the user is authenticated.
 * @returns JSX.Element
 */
function Actions() {
    const [mounted, setMounted] = useState(false);
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const pathname = usePathname();
    const router = useRouter();

    /**
     * Checks the authentication status of the admin user and updates the state accordingly.
     */
    useEffect(() => {
        let isMountedComponent = true;

        async function checkAuth() {
            try {
                const status = await verifySession();
                if (isMountedComponent) {
                    setIsAuth(status);
                }
            } catch (error) {
                console.error("Failed to fetch session status", error);
            }
        }

        checkAuth();
        setMounted(true);

        return () => {
            isMountedComponent = false;
        };
    }, [pathname]);

    /**
     * Handles the sign-out action for the admin user.
     * @param e the mouse event triggered by clicking the sign-out link
     */
    async function handleSignOut(e: React.MouseEvent) {
        e.preventDefault();
        setIsAuth(false);
        await logoutAdmin();
        router.push("/");
    }

    const handleNavigate = (url: string) => router.push(url);

    return (
        <>
            {mounted ? (
                <Tooltip content="Get in touch">
                    <IconButton aria-label="Get in touch" variant="ghost">
                        <NextLink href="/contact">
                            <TbSend />
                        </NextLink>
                    </IconButton>
                </Tooltip>
            ) : (
                <IconButton
                    aria-label="Loading"
                    variant="ghost"
                    disabled
                    opacity={0.5}>
                    <Spinner size="xs" />
                </IconButton>
            )}
            {mounted ? (
                <ColorModeButton variant="ghost" />
            ) : (
                <IconButton
                    aria-label="Loading"
                    variant="ghost"
                    disabled
                    opacity={0.5}>
                    <Spinner size="xs" />
                </IconButton>
            )}
            {isAuth && (
                <Menu.Root>
                    <Menu.Trigger asChild>
                        <IconButton
                            aria-label="Admin Panel"
                            variant="ghost"
                            colorPalette="red">
                            <TbLockOpen size={16} />
                        </IconButton>
                    </Menu.Trigger>
                    <Portal>
                        <Menu.Positioner>
                            <Menu.Content
                                textStyle="body"
                                w={40}
                                mt={1}
                                bg="bg.panel"
                                borderColor="border">
                                <Menu.Item
                                    value="manage"
                                    onClick={() =>
                                        handleNavigate("/auth/manage")
                                    }>
                                    <TbBrowser />
                                    Manage Site
                                </Menu.Item>
                                <Menu.Item
                                    value="leads"
                                    onClick={() =>
                                        handleNavigate("/auth/manage/leads")
                                    }>
                                    <TbFlag />
                                    Leads
                                </Menu.Item>
                                <Menu.Separator />
                                <Menu.Item
                                    value="signout"
                                    color="fg.error"
                                    _hover={{
                                        bg: "bg.error",
                                        color: "fg.error",
                                    }}
                                    onClick={handleSignOut}>
                                    <TbLogout />
                                    Sign Out
                                </Menu.Item>
                            </Menu.Content>
                        </Menu.Positioner>
                    </Portal>
                </Menu.Root>
            )}
        </>
    );
}

export default function Navbar() {
    const pathname = usePathname();
    const navbarRef = useRef<HTMLDivElement>(null);
    const [elevate, setElevate] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [mounted, setMounted] = useState(false);

    /**
     * Adds a shadow to the navbar when the user scrolls past the header.
     */
    useEffect(() => {
        function handleScroll() {
            setElevate(
                window.scrollY > document.querySelector("header")!.clientHeight,
            );
        }
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    /**
     * Sets the mounted state to true after the component has been mounted to ensure that client-only features are rendered correctly.
     */
    useEffect(() => {
        setMounted(true);
    }, []);

    /**
     * Closes the mobile navigation menu on route change and scrolls to the anchor if present.
     */
    useEffect(() => {
        setOpen(false);

        const handleRouteChange = () => {
            if (pathname.includes("#")) {
                const el = document.getElementById(pathname.split("#")[1]);
                if (el) {
                    console.log("Scrolling to element:", el);
                    window.scrollTo({
                        top:
                            el.offsetTop -
                            (navbarRef.current?.clientHeight || 0),
                        behavior: "smooth",
                    });
                }
            } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        };
        handleRouteChange();
    }, [pathname, navbarRef]);

    return (
        <Flex
            ref={navbarRef}
            as="nav"
            bg="bg.panel/60"
            backdropFilter="saturate(180%) blur(10px)"
            color="fg"
            position="sticky"
            top={0}
            borderY="1px solid"
            borderTopColor="border"
            borderBottomColor="border"
            zIndex={99}
            shadow={elevate ? "sm" : "none"}>
            <Container maxW="4xl">
                <Box py={2}>
                    {/* Desktop Nav */}
                    <Flex
                        display={{
                            base: "none",
                            md: "flex",
                        }}
                        h="100%"
                        flex={1}
                        align="center"
                        gap={2}
                        color="fg">
                        <NavLinks />
                        <Box flexGrow={1} />
                        <Flex gap={4} align="center">
                            <Actions />
                        </Flex>
                    </Flex>
                    {/* Mobile Nav */}
                    <Flex display={{ base: "block", md: "none" }} w="100%">
                        {mounted ? (
                            <Collapsible.Root
                                open={open}
                                onOpenChange={(e) => setOpen(e.open)}
                                style={{ width: "100%" }}>
                                <Flex align="center" gap={4}>
                                    <Collapsible.Trigger asChild>
                                        <Button
                                            variant="surface"
                                            display={{
                                                base: "flex",
                                                md: "none",
                                            }}
                                            alignItems="center"
                                            gap={2}>
                                            {open ? <TbX /> : <TbMenu />}
                                            <span>Menu</span>
                                        </Button>
                                    </Collapsible.Trigger>
                                    <Box flexGrow={1} />
                                    <Actions />
                                </Flex>
                                <Collapsible.Content asChild>
                                    <Flex
                                        direction="column"
                                        w="100%"
                                        gap={2}
                                        py={4}
                                        zIndex={99}
                                        color="fg">
                                        <NavLinks />
                                    </Flex>
                                </Collapsible.Content>
                            </Collapsible.Root>
                        ) : (
                            <Flex align="center" gap={4}>
                                <Skeleton
                                    height="40px"
                                    width="98px"
                                    borderRadius="lg"
                                />
                                <Box flexGrow={1} />
                                <Skeleton
                                    height="40px"
                                    width="40px"
                                    borderRadius="lg"
                                />
                                <Skeleton
                                    height="40px"
                                    width="40px"
                                    borderRadius="lg"
                                />
                            </Flex>
                        )}
                    </Flex>
                </Box>
            </Container>
        </Flex>
    );
}
