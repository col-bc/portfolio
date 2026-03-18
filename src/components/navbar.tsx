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
    Link,
    Menu,
    Portal,
    Spinner,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
    LuBriefcaseBusiness,
    LuGraduationCap,
    LuHouse,
    LuMenu,
    LuMessageSquare,
    LuSend,
    LuSettings,
    LuX,
} from "react-icons/lu";

function NavLinks() {
    const pathname = usePathname();
    const isCurrentPath = (href: string) =>
        pathname === href ||
        (href.includes("#") && pathname.startsWith(href.split("#")[0]));

    return (
        <>
            <Link
                as={NextLink}
                href="/#"
                spaceX={2}
                color={isCurrentPath("/") ? "teal.fg" : "inherit"}
                w={{ base: "100%", md: "auto" }}>
                <LuHouse size={16} />
                <span>Home</span>
            </Link>
            <Link
                as={NextLink}
                href="/education"
                spaceX={2}
                color={isCurrentPath("/education") ? "teal.fg" : "inherit"}
                w={{ base: "100%", md: "auto" }}>
                <LuGraduationCap size={16} />
                <span>Education</span>
            </Link>
            <Link
                as={NextLink}
                href="/employment"
                spaceX={2}
                color={isCurrentPath("/employment") ? "teal.fg" : "inherit"}
                w={{ base: "100%", md: "auto" }}>
                <LuBriefcaseBusiness size={16} />
                Employment
            </Link>
            <Link
                as={NextLink}
                href="/contact"
                spaceX={2}
                color={isCurrentPath("/contact") ? "teal.fg" : "inherit"}
                w={{ base: "100%", md: "auto" }}>
                <LuMessageSquare size={16} />
                Contact
            </Link>
        </>
    );
}

function Actions() {
    // Avoid hydration mismatch by only rendering the color mode button on the client
    const [mounted, setMounted] = useState(false);
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const pathname = usePathname();

    useEffect(() => {
        let isMountedComponent = true;

        async function checkAuth() {
            try {
                const status = await getSessionStatus();
                if (isMountedComponent) {
                    setIsAuth(status);
                }
                console.log("Session status:", status);
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

    async function handleSignOut(e: React.MouseEvent) {
        e.preventDefault();
        setIsAuth(false);
        await logoutAdmin();
    }

    return (
        <>
            <Tooltip content="Get in touch">
                <Link href="/contact">
                    <Button variant="ghost" colorPalette="bg">
                        <LuSend size={16} />
                    </Button>
                </Link>
            </Tooltip>
            {mounted ? (
                <ColorModeButton variant="ghost" colorPalette="bg" />
            ) : (
                <Button
                    variant="ghost"
                    colorPalette="bg"
                    disabled
                    opacity={0.5}>
                    <Spinner size="xs" />
                </Button>
            )}
            {isAuth && (
                <Tooltip content="Admin Panel">
                    <Menu.Root>
                        <Menu.Trigger asChild>
                            <Button variant="ghost" colorPalette="bg">
                                <LuSettings size={16} />
                            </Button>
                        </Menu.Trigger>
                        <Portal>
                            <Menu.Positioner>
                                <Menu.Content>
                                    <Menu.Item value="leads" asChild>
                                        <Link as={NextLink} href="/leads">
                                            Leads
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item value="signout" asChild>
                                        <Link href="#" onClick={handleSignOut}>
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

    // Add shadow to navbar when scrolling past header
    const [elevate, setElevate] = useState<boolean>(false);
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

    // Close mobile nav on route change and scroll to anchor if present
    const [open, setOpen] = useState<boolean>(false);
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
            bg="bg.muted"
            position="sticky"
            top={0}
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
                        gap={6}>
                        <NavLinks />
                        <Box flexGrow={1} />
                        <Flex gap={2} align="center">
                            <Actions />
                        </Flex>
                    </Flex>
                    {/* Mobile Nav */}
                    <Flex display={{ base: "block", md: "none" }} w="100%">
                        <Collapsible.Root
                            open={open}
                            onOpenChange={(e) => setOpen(e.open)}
                            style={{ width: "100%" }}>
                            <Flex align="center" gap={2}>
                                <Collapsible.Trigger asChild>
                                    <Button
                                        variant="surface"
                                        display={{ base: "flex", md: "none" }}
                                        alignItems="center"
                                        gap={2}>
                                        {open ? <LuX /> : <LuMenu />}
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
                                    zIndex={99}>
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
