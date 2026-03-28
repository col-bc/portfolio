"use client";

import { getSessionStatus, logoutAdmin } from "@/app/lib/handleAuth";
import { ColorModeButton } from "@/components/ui/color-mode";
import { Tooltip } from "@/components/ui/tooltip";
import {
    Box,
    Button,
    Collapsible,
    Container,
    Flex,
    IconButton,
    Link,
    Menu,
    Portal,
    Spinner,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
    TbBriefcase2,
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
    const isCurrentPath = (href: string) =>
        pathname === href ||
        (href.includes("#") && pathname.startsWith(href.split("#")[0]));

    return (
        <>
            <Link
                as={NextLink}
                href="/"
                spaceX={2}
                color={isCurrentPath("/") ? "teal.fg" : "inherit"}
                w={{ base: "100%", md: "auto" }}>
                <TbHome />
                <span>Home</span>
            </Link>
            <Link
                as={NextLink}
                href="/education"
                spaceX={2}
                color={isCurrentPath("/education") ? "teal.fg" : "inherit"}
                w={{ base: "100%", md: "auto" }}>
                <TbSchool />
                <span>Education</span>
            </Link>
            <Link
                as={NextLink}
                href="/employment"
                spaceX={2}
                color={isCurrentPath("/employment") ? "teal.fg" : "inherit"}
                w={{ base: "100%", md: "auto" }}>
                <TbBriefcase2 />
                Employment
            </Link>
            <Link
                as={NextLink}
                href="/contact"
                spaceX={2}
                color={isCurrentPath("/contact") ? "teal.fg" : "inherit"}
                w={{ base: "100%", md: "auto" }}>
                <TbMessage />
                Contact
            </Link>
        </>
    );
}

/**
 * Renders the action buttons for the navbar, including the color mode toggle,
 * contact button, and admin panel menu if the user is authenticated.
 * @returns JSX.Element
 */
function Actions() {
    // Avoid hydration mismatch by only rendering the color mode button on the client
    const [mounted, setMounted] = useState(false);
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const pathname = usePathname();

    /**
     * Checks the authentication status of the admin user and updates the state accordingly.
     */
    useEffect(() => {
        let isMountedComponent = true;

        async function checkAuth() {
            try {
                const status = await getSessionStatus();
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
    }

    return (
        <>
            <Tooltip content="Get in touch">
                <IconButton
                    aria-label="Get in touch"
                    variant="ghost"
                    colorPalette="blackAlpha">
                    <NextLink href="/contact">
                        <TbSend />
                    </NextLink>
                </IconButton>
            </Tooltip>
            {mounted ? (
                <ColorModeButton variant="ghost" colorPalette="whiteAlpha" />
            ) : (
                <IconButton
                    aria-label="Loading"
                    variant="ghost"
                    colorPalette="whiteAlpha"
                    disabled
                    opacity={0.5}>
                    <Spinner size="xs" />
                </IconButton>
            )}
            {isAuth && (
                <Tooltip content="Admin Panel">
                    <Menu.Root>
                        <Menu.Trigger asChild>
                            <IconButton
                                aria-label="Admin Panel"
                                variant="surface"
                                colorPalette="red">
                                <TbLockOpen size={16} />
                            </IconButton>
                        </Menu.Trigger>
                        <Portal>
                            <Menu.Positioner>
                                <Menu.Content textStyle="body">
                                    <Menu.Item value="leads" asChild>
                                        <Link as={NextLink} href="/auth/leads">
                                            <TbFlag />
                                            Leads
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item value="signout" asChild>
                                        <Link href="#" onClick={handleSignOut}>
                                            <TbLogout />
                                            Sign Out
                                        </Link>
                                    </Menu.Item>
                                </Menu.Content>
                            </Menu.Positioner>
                        </Portal>
                    </Menu.Root>
                </Tooltip>
            )}
        </>
    );
}

export default function Navbar() {
    const pathname = usePathname();
    const navbarRef = useRef<HTMLDivElement>(null);
    const [elevate, setElevate] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

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
            bg="bg.subtle"
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
                        gap={8}
                        color="fg">
                        <NavLinks />
                        <Box flexGrow={1} />
                        <Flex gap={4} align="center">
                            <Actions />
                        </Flex>
                    </Flex>
                    {/* Mobile Nav */}
                    <Flex display={{ base: "block", md: "none" }} w="100%">
                        <Collapsible.Root
                            open={open}
                            onOpenChange={(e) => setOpen(e.open)}
                            style={{ width: "100%" }}>
                            <Flex align="center" gap={4}>
                                <Collapsible.Trigger asChild>
                                    <Button
                                        variant="surface"
                                        display={{ base: "flex", md: "none" }}
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
                                    gap={4}
                                    py={4}
                                    zIndex={99}
                                    color="fg">
                                    <NavLinks />
                                </Flex>
                            </Collapsible.Content>
                        </Collapsible.Root>
                    </Flex>
                </Box>
            </Container>
        </Flex>
    );
}
