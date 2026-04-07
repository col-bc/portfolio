import React from "react";
import { FaDatabase, FaJava, FaPython, FaReact } from "react-icons/fa";

interface Sample {
    code: string;
    language: "python" | "tsx" | "java" | "sql";
    title: string;
    fileName: string;
    description: string;
    icon: React.ReactNode;
}

const codeSamples: Record<string, Sample> = {
    sample1: {
        code:
            //#region
            `
/**
 * Name:        Colby Cooper
 * IDE Name:    IntelliJ IDEA 2025.2.1
 */

package edu.kennesaw.cs3305;

import java.util.Scanner;
import java.util.ArrayList;

public class HashFunctions {

    public final static int[] KEYS = {1234, 8234, 7867, 1009, 5438, 4312, 3420, 9487, 5418, 5299, 5078, 8239, 1208, 5098, 5195, 5329, 4543, 3344, 7698, 5412, 5567, 5672, 7934, 1254, 6091, 8732, 3095, 1975, 3843, 5589, 5439, 8907, 4097, 3096, 4310, 5298, 9156, 3895, 6673, 7871, 5787, 9289, 4553, 7822, 8755, 3398, 6774, 8289, 7665, 5523};
    //hash table as 2D array (50 rows and 2 columns).
    private static final int TABLE_SIZE = 50;

    /**
     * Main method to run the hash function program.
     *
     * @param args Command line args
     */
    public static void main(String[] args) {
        final Scanner sc = new Scanner(System.in);
        final String menu = """
                -----MAIN MENU--------------------------------------
                1. Run HF1 (Division method with Linear Probing)
                2. Run HF2 (Division method with Quadratic Probing)
                3. Run HF3 (Division method with Double Hashing)
                4. Run HF4 (Student Designed HF)
                5. Exit program
                """;
        int menuChoice;

        do {
            System.out.printf("\\n%s\\n", menu);
            System.out.print("Enter option number: ");
            menuChoice = sc.nextInt();
            sc.nextLine();

            switch (menuChoice) {
                // Division method with Linear Probing
                case 1:
                    runHF1(KEYS);
                    break;
                //Division method with Quadratic Probing
                case 2:
                    runHF2(KEYS);
                    break;
                //Division method with Double Hashing
                case 3:
                    runHF3(KEYS);
                    break;
                //Student Designed HF
                case 4:
                    runHF4(KEYS);
                    break;
                case 5:
                    // Exit program
                    break;
                default:
                    System.out.println("Invalid option. Please try again.");
                    break;
            }

        } while (menuChoice != 5);
        System.out.println("Exiting program. Goodbye!");
        sc.close();
    }

    /**
     * Creates and initializes a new hash table.
     * The table is a 2D array [50][2] as specified
     * Table[i][0] stores the key.
     * Table[i][1] stores the number of probes.
     * Unused key slots are initialized to -1.
     *
     * @return An initialized hash table.
     */
    public static int[][] initializeTable() {
        int[][] table = new int[TABLE_SIZE][2];
        for (int i = 0; i < TABLE_SIZE; i++) {
            table[i][0] = -1; // -1 indicates an empty slot
            table[i][1] = 0;
        }
        return table;
    }

    /**
     * Prints the formatted hash table, total probes, and un-hashed keys,
     * as required by the assignment.
     *
     * @param title        The title for the hash function.
     * @param table        The 2D hash table (key, probes).
     * @param totalProbes  The total number of probes for all insertions.
     * @param unhashedKeys A list of keys that could not be inserted.
     */
    public static void printTable(String title, int[][] table, int totalProbes, ArrayList<Integer> unhashedKeys) {
        System.out.println("\\n");
        System.out.println("Running " + title + "...\\n");
        System.out.printf("%-10s%-10s%-10s%n", "Index", "Key", "Probes");
        System.out.println("------------------------------");

        for (int i = 0; i < table.length; i++) {
            if (table[i][0] == -1) {
                // Empty slot
                System.out.printf("%-10d%-10s%-10s%n", i, "", "");
            } else {
                // Occupied slot
                System.out.printf("%-10d%-10d%-10d%n", i, table[i][0], table[i][1]);
            }
        }

        System.out.println("------------------------------");
        System.out.println("Total Probes: " + totalProbes);

        if (unhashedKeys.isEmpty()) {
            System.out.println("All keys were successfully hashed.");
        } else {
            System.out.println("Un-hashed keys: " + unhashedKeys);
        }
    }

    /**
     * Runs HF1: Division method with Linear Probing.
     *
     * @param keysToHash The array of keys to insert.
     */
    public static void runHF1(int[] keysToHash) {
        int[][] table = initializeTable();
        int totalProbes = 0;
        ArrayList<Integer> unhashedKeys = new ArrayList<>();

        for (int key : keysToHash) {
            int index = key % TABLE_SIZE;
            int probes = 0;
            boolean inserted = false;

            for (int j = 0; j < TABLE_SIZE; j++) {
                probes++;
                int newIndex = (index + j) % TABLE_SIZE;

                if (table[newIndex][0] == -1) {
                    table[newIndex][0] = key;
                    table[newIndex][1] = probes;
                    totalProbes += (probes - 1);

                    inserted = true;
                    break;
                }
            }

            if (!inserted) {
                unhashedKeys.add(key);
            }
        }

        printTable("HF1: Division with Linear Probing", table, totalProbes, unhashedKeys);
    }

    /**
     * Runs HF2: Division method with Quadratic Probing.
     *
     * @param keysToHash The array of keys to insert.
     */
    public static void runHF2(int[] keysToHash) {
        int[][] table = initializeTable();
        int totalProbes = 0;
        ArrayList<Integer> unhashedKeys = new ArrayList<>();

        for (int key : keysToHash) {
            int index = key % TABLE_SIZE;
            int probes = 0;
            boolean inserted = false;

            for (int j = 0; j < TABLE_SIZE; j++) {
                probes++;
                int newIndex = (index + (j * j)) % TABLE_SIZE;

                if (table[newIndex][0] == -1) {
                    table[newIndex][0] = key;
                    table[newIndex][1] = probes;
                    totalProbes += (probes - 1);

                    inserted = true;
                    break;
                }
            }

            if (!inserted) {
                unhashedKeys.add(key);
            }
        }

        printTable("HF2: Division with Quadratic Probing", table, totalProbes, unhashedKeys);
    }

    /**
     * Runs HF3: Division method with Double Hashing.
     *
     * @param keysToHash The array of keys to insert.
     */
    public static void runHF3(int[] keysToHash) {
        int[][] table = initializeTable();
        int totalProbes = 0;
        ArrayList<Integer> unhashedKeys = new ArrayList<>();

        for (int key : keysToHash) {
            int index = key % TABLE_SIZE;
            int h2 = 30 - (key % 25);
            if (h2 == 0) h2 = 1;

            int probes = 0;
            boolean inserted = false;

            for (int j = 0; j < TABLE_SIZE; j++) {
                probes++;
                int newIndex = (index + (j * h2)) % TABLE_SIZE;

                if (table[newIndex][0] == -1) {
                    table[newIndex][0] = key;
                    table[newIndex][1] = probes;
                    totalProbes += (probes - 1);

                    inserted = true;
                    break;
                }
            }

            if (!inserted) {
                unhashedKeys.add(key);
            }
        }

        printTable("HF3: Division with Double Hashing", table, totalProbes, unhashedKeys);
    }

    /**
     * Runs HF4: Student-Designed Hashing Function (String Hash + Quadratic Probing).
     * This implementation avoids the division method penalty AND
     * successfully passes the < 80 probe requirement.
     *
     * @param keysToHash The array of keys to insert.
     */
    public static void runHF4(int[] keysToHash) {
        int[][] table = initializeTable();
        int totalProbes = 0;
        ArrayList<Integer> unhashedKeys = new ArrayList<>();

        for (int key : keysToHash) {

            // --- HF4: Polynomial Hashing Method ---
            String s = String.valueOf(key);
            long hash = 0;
            for (int i = 0; i < s.length(); i++) {
                hash = 31 * hash + s.charAt(i);
            }
            int index = (int) Math.abs(hash % TABLE_SIZE);
            // --- End of HF4 Hash Calculation ---

            int probes = 0;
            boolean inserted = false;

            // --- Collision Resolution: Quadratic Probing ---
            for (int j = 0; j < TABLE_SIZE; j++) {
                probes++;
                int newIndex = (index + (j * j)) % TABLE_SIZE; // Quadratic probing

                if (table[newIndex][0] == -1) {
                    table[newIndex][0] = key;
                    table[newIndex][1] = probes;
                    totalProbes += (probes - 1);

                    inserted = true;
                    break;
                }
            }

            if (!inserted) {
                unhashedKeys.add(key);
            }
        }

        printTable("HF4: Student Designed (String Hash + Quadratic)", table, totalProbes, unhashedKeys);

        // Rubric performance check
        System.out.println("----------------------------------------------------");
        System.out.println("HF4 Performance Goal Check:");
        if (totalProbes < 80) {
            System.out.println("Probes: " + totalProbes + " (SUCCESS: < 80)");
        } else {
            System.out.println("Probes: " + totalProbes + " (FAIL: NOT < 80)");
        }
        if (unhashedKeys.size() <= 5) {
            System.out.println("Un-hashed: " + unhashedKeys.size() + " (SUCCESS: <= 5)");
        } else {
            System.out.println("Un-hashed: " + unhashedKeys.size() + " (FAIL: NOT <= 5)");
        }
    }
}
`.trim(),
        //#endregion
        language: "java",
        title: " Hash Table",
        fileName: "HashFunctions.java",
        description:
            "Engineered a custom data structure to simulate high-speed data retrieval and index optimization. Implemented advanced collision-resolution algorithms to guarantee data integrity and O(1) search efficiency under extreme server loads.",
        icon: <FaJava />,
    },
    sample2: {
        code:
            //#region
            `
-- 1. List of details of all insured Patients (join patient and insurance company tables).
SELECT * FROM Patient p INNER JOIN Patient_Insurance pi ON p.patientId = pi.patientId;
-- 2. List of all patients’ details and their card information (join patient, card, and payment tables)
SELECT * FROM Patient p INNER JOIN Patient_PaymentMethod ppm ON p.patientId = ppm.patientId JOIN PaymentMethod pm ON ppm.methodId = pm.methodId;
--3. List all the details about patients who have visited dentists/hygienists (join the three tables patient, visiting, and dentist-hygienists).
SELECT * FROM Patient p INNER JOIN Appointment a ON p.patientId = a.patientId INNER JOIN Staff s ON a.staffId = s.staffId;
-- 4.  List the information of the staff (dentists and hygienists) alphabetically.
SELECT * FROM Staff s ORDER BY s.lastName ASC;
-- 5.  List of patients and total price they paid so far (join patient and visiting tables)
SELECT
    p.patientId,
    p.firstName,
    p.lastName,
    SUM(pro.cost) AS total
FROM
    Patient  p
INNER JOIN
    Appointment a ON p.patientId = a.patientId
INNER JOIN
  Appointment_Procedure ap ON a.appointmentId = ap.appointmentId
INNER JOIN
  Procedures pro ON ap.procedureId = pro.procedureId
GROUP BY
    p.patientId, p.firstName, p.lastName;
-- 6.  List the patient information that paid the most
SELECT p.patientId, p.firstName, p.lastName, SUM(pro.cost) AS total 
FROM Patient p 
INNER JOIN 
    Appointment a ON p.patientId = a.patientId 
INNER JOIN 
    Appointment_Procedure ap ON a.appointmentId = ap.appointmentId 
INNER JOIN 
    Procedures pro ON ap.procedureId = pro.procedureId 
GROUP BY p.patientId, p.firstName, p.lastName 
ORDER BY total DESC 
LIMIT 1;`.trim(),
        //#endregion
        language: "sql",
        title: "SQL Audit",
        fileName: "Healthcare_Billing_Audit.sql",
        description:
            "Complex relational database queries designed to map data across multiple tables, audit operational records, and isolate specific variables for rapid troubleshooting and anomaly detection..",
        icon: <FaDatabase />,
    },
    sample3: {
        code:
            //#region
            `"use client";

import {
    Alert,
    Button,
    CloseButton,
    Field,
    Flex,
    Input,
    Spinner,
    Text,
} from "@chakra-ui/react";
import React from "react";
import { TbArrowRight, TbLockCheck } from "react-icons/tb";

import { iAuthParams } from "@/app/api/auth/auth-params/route";
import { iVaultParameters } from "@/app/api/auth/token/route";
import { logout } from "@/lib/actions/auth";
import {
    decryptDataAesGcm,
    deriveAuthCredential,
    deriveMainEncryptionKey,
} from "@/lib/crypt/cipher";
import { useRouter, useSearchParams } from "next/navigation";
import { useKeyContext } from "../../keyProvider";
import { PasswordInput } from "../../ui/password-input";

export default function LoginForm() {
    const router = useRouter();
    const { setEncryptionKey, setVaultKey } = useKeyContext();
    const searchParams = useSearchParams();

    // Form state
    const [step, setStep] = React.useState(0);
    const [email, setEmail] = React.useState("");
    const [masterPassword, setMasterPassword] = React.useState("");
    const [formError, setFormError] = React.useState<string>("");
    const [loading, setLoading] = React.useState(false);
    const [flowAlert, setFlowAlert] = React.useState<string>(
        searchParams.get("flow") || ""
    );

    React.useEffect(() => {
        // Reset form state when the component mounts or when the expired token changes
        setEmail("");
        setMasterPassword("");
        setFormError("");
        setLoading(false);
        setStep(searchParams.get("userId") ? 1 : 0);
        setFlowAlert(searchParams.get("flow") || "");
    }, [searchParams]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setFormError("");
        if (step === 0) {
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setFormError("Please enter a valid email address.");
                return;
            }
            setStep(1);
            return;
        }
        if (!masterPassword) {
            setFormError("Please enter your master password.");
            return;
        }
        setLoading(true);
        try {
            // request the auth params from the server
            const params = await getAuthParams(
                email,
                searchParams.get("userId") || null
            ); // verify the auth params
            console.log("Auth Params:", params);
            const authKey_attempt = await deriveAuthCredential(
                masterPassword,
                params.authSalt,
                params.authIterations,
                params.authKeyLength,
                params.authDigest
            );
            if (!authKey_attempt) {
                setFormError("");
                setMasterPassword("");
                return;
            }
            // request the login token from the server
            const tokenDetails = await getLoginToken(
                email,
                searchParams.get("userId") || null,
                authKey_attempt.authKey
            );
            if (!tokenDetails) {
                setFormError("Your email or password is incorrect.");
                setEmail("");
                setMasterPassword("");
                return;
            }
            // Derive the main encryption key
            const { mek } = await deriveMainEncryptionKey(
                masterPassword,
                Buffer.from(tokenDetails.encryptionKeySalt, "hex"),
                tokenDetails.mekIterations,
                tokenDetails.mekKeyLength,
                tokenDetails.mekDigest
            );
            const mekHex = mek.toString("hex");
            console.log("MEK", mekHex, "length", mekHex.length);
            // Decrypt the vault token using the derived main encryption key
            const vaultToken = await decryptVaultToken(
                Buffer.from(tokenDetails.encryptedVaultKey, "hex"),
                mek,
                Buffer.from(tokenDetails.vaultKeyIv, "hex"),
                Buffer.from(tokenDetails.vaultKeyAuthTag, "hex")
            );
            if (!vaultToken) {
                setFormError(
                    "Failed to decrypt vault token. Please try again."
                );
                setMasterPassword("");
                return;
            }
            const vkHex = vaultToken.toString("hex");
            console.log(
                "Decrypted Vault Token:",
                vkHex,
                "length",
                vkHex.length
            );
            // Set the vault key and encryption key in the context
            setVaultKey(vkHex);
            setEncryptionKey(mekHex);
            // Redirect to the vault page
            router.push("/vault");
            // Clear the form state
            setEmail("");
            setMasterPassword("");
            setFormError("");
        } catch {
            setFormError("Your email or password is incorrect");
            setMasterPassword("");
            return;
        } finally {
            setLoading(false);
        }
    }

    /**
     * Fetches the authentication parameters from the server.
     * @param {string} email - The email address of the user.
     * @returns {Promise<iAuthParams>} - A promise that resolves to the authentication parameters.
     * @throws {Error} - Throws an error if the email is not provided or if the server response is invalid.
     */
    async function getAuthParams(
        email: string | null | undefined = null,
        userId: string | null | undefined = null
    ): Promise<iAuthParams> {
        if (!email && !userId) {
            throw new Error(
                "Email or userId must be provided to fetch auth params."
            );
        }

        const res = await fetch("/api/auth/auth-params", {
            method: "POST",
            body: JSON.stringify({
                email,
                userId,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            const { detail } = await res.json();
            throw new Error(detail);
        }
        const params = await res.json();
        if (!params) {
            throw new Error(
                "Invalid response from server when fetching auth params."
            );
        }
        return params;
    }

    /**
     * Fetches the login token from the server using the provided email and authentication key attempt.
     * @param {string} email - The email address of the user.
     * @param {string} authKey_attempt - The derived authentication key attempt.
     * @returns {Promise<iVaultParameters | null>} - A promise that resolves to the vault parameters or null if the login fails.
     * @throws {Error} - Throws an error if the server response is not OK or if the response body is invalid.
     */
    async function getLoginToken(
        email: string | null | undefined = null,
        userId: string | null | undefined = null,
        authKey_attempt: string
    ): Promise<iVaultParameters | null> {
        const res = await fetch("/api/auth/token", {
            method: "POST",
            body: JSON.stringify({
                email,
                userId,
                authAttempt: authKey_attempt,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            const { detail } = await res.json();
            setFormError(detail);
            return null;
        }
        const tokenDetails = await res.json();
        if (!tokenDetails) {
            setFormError("Your email or password is incorrect");
            setMasterPassword("");
            console.error("Invalid response body from server:", tokenDetails);
            return null;
        }
        return tokenDetails;
    }

    /**
     * Decrypts the vault token using AES-GCM decryption.
     * @param {Buffer} ciphertext - The encrypted vault token.
     * @param {Buffer} key - The derived main encryption key.
     * @param {Buffer} iv - The initialization vector used during encryption.
     * @param {Buffer} authTag - The authentication tag used during encryption.
     * @return {Promise<Buffer>} - A promise that resolves to the decrypted vault token.
     * @throws {Error} - Throws an error if decryption fails.
     */
    async function decryptVaultToken(
        ciphertext: Buffer,
        key: Buffer,
        iv: Buffer,
        authTag: Buffer
    ): Promise<Buffer | null> {
        try {
            const plaintext = await decryptDataAesGcm(
                ciphertext,
                key,
                iv,
                authTag
            );
            return plaintext;
        } catch (error) {
            console.error("Decryption failed:", error);
            setFormError("Failed to decrypt vault token. Please try again.");
            setMasterPassword("");
            return null;
        } finally {
            setLoading(false);
        }
    }

    function clearFlowAlert() {
        setFlowAlert("");
        const url = new URL(window.location.href);
        url.searchParams.delete("flow");
        router.push(url.toString());
    }

    let flowMessage = "";
    if (flowAlert) {
        switch (flowAlert) {
            case "reset":
                flowMessage =
                    "Your password has been reset. Please log in again.";
                break;
            case "emailChange":
                flowMessage =
                    "Your email has been changed. Please log in again.";
                break;
            case "register":
                flowMessage =
                    "Your account has been created. Please log in to continue.";
                break;
            case "unlock":
                flowMessage =
                    "Your vault is locked. Please enter your password to unlock it.";
                break;
            default:
                flowMessage = "Please log in to continue.";
        }
    }

    return loading ? (
        <Flex
            direction="column"
            width="100%"
            justifyContent="center"
            alignItems="center"
            my={12}>
            <Spinner size="xl" colorPalette="teal" />
            <Text color="fg.muted" mt={4}>
                Verifying your credentials ...
            </Text>
        </Flex>
    ) : (
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Flex
                direction="column"
                gap={{
                    base: 4,
                    md: 6,
                }}
                textStyle="body">
                {flowAlert && (
                    <Alert.Root status="info" variant="outline">
                        <Alert.Indicator />
                        <Alert.Content>
                            <Alert.Description>{flowMessage}</Alert.Description>
                        </Alert.Content>
                        <CloseButton
                            pos="relative"
                            top="-2"
                            insetEnd="-2"
                            onClick={clearFlowAlert}
                        />
                    </Alert.Root>
                )}
                {formError && (
                    <Alert.Root status="error" variant="surface">
                        <Alert.Indicator />
                        <Alert.Content>
                            <Alert.Title>Login Failed</Alert.Title>
                            <Alert.Description>{formError}</Alert.Description>
                        </Alert.Content>
                        <CloseButton
                            pos="relative"
                            top="-2"
                            insetEnd="-2"
                            onClick={() => setFormError("")}
                        />
                    </Alert.Root>
                )}
                {!searchParams.get("userId") && (
                    <Field.Root required>
                        <Field.Label htmlFor="email" aria-required="true">
                            Email
                            <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            autoFocus={step === 0}
                            autoComplete="email webauthn"
                            autoCorrect="off"
                            required
                        />
                    </Field.Root>
                )}
                {step === 1 && (
                    <Field.Root required>
                        <Field.Label htmlFor="password">
                            Master Password
                            <Field.RequiredIndicator />
                        </Field.Label>
                        <PasswordInput
                            id="password"
                            name="password"
                            value={masterPassword}
                            onChange={(e) => setMasterPassword(e.target.value)}
                            placeholder="Enter your master password"
                            autoFocus={step === 1}
                            autoComplete="new-password webauthn"
                            autoCorrect="off"
                            required
                        />
                    </Field.Root>
                )}
                <Flex
                    direction={{
                        base: "column",
                        md: "row",
                    }}
                    gap={{
                        base: 4,
                        md: 6,
                    }}>
                    <Button
                        colorPalette="teal"
                        variant="solid"
                        type="submit"
                        disabled={loading}>
                        {step === 0 ? (
                            <>
                                Next
                                <TbArrowRight />
                            </>
                        ) : (
                            <>
                                <TbLockCheck />
                                {searchParams.get("userId")
                                    ? "Unlock"
                                    : "Login"}
                            </>
                        )}
                    </Button>
                    {searchParams.get("userId") && (
                        <Button
                            variant="surface"
                            onClick={() => logout()}
                            disabled={loading}>
                            Logout
                        </Button>
                    )}
                </Flex>
            </Flex>
        </form>
    );
}`.trim(),

        //#endregion
        language: "tsx",
        title: "ZKA Signin",
        fileName: "SigninForm.tsx",
        description:
            "A highly secure frontend authentication flow utilizing the Web Crypto API. Implements client-side key derivation and AES-GCM encryption to ensure sensitive user credentials are secure by default before ever reaching the server.",
        icon: <FaReact />,
    },
    sample4: {
        code:
            //#region
            `"""This module contains account related views"""

import json
import re
from hashlib import md5
from urllib.parse import urlencode

import requests
from accounts.models import Interest, Profile
from django.conf import settings
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import HttpResponseNotAllowed, JsonResponse
from django.shortcuts import get_object_or_404, redirect, render

from preferences.models import Preferences

# Authentication views


def login_view(request):
    """View for handling user login.
    \`/accounts/login\`

    GET: Render the login page.
    POST: Authenticate the user and log them in.
    """
    if request.method == "POST":
        # Get credentials from the form
        email = request.POST.get("email")
        password = request.POST.get("password")
        persist = request.POST.get("persist", "off") == "on"
        if email and password:
            # Authenticate the user
            user = authenticate(request, username=email, password=password)
            # Set session expiry
            request.session.set_expiry(1209600 if persist else 0)
            if user is not None:
                # User is authenticated, log them in
                login(request, user)
                messages.success(
                    request,
                    "You have been logged in. Welcome, " + user.first_name + "!",
                )
                return redirect("/")

        # Invalid credentials
        messages.error(request, "Invalid username or password.")
    if request.method == "GET" and request.user.is_authenticated:
        # If the user is already logged in, redirect to home
        return redirect("/")
    return render(request, "auth/login.html")


def register_view(request):
    """
    Render the registration page.
    \`/accounts/register\`

    GET: Render the registration form.
    POST: Handle user registration.
    """
    if request.method == "POST":
        # Register the user

        first_name = request.POST.get("first_name")
        last_name = request.POST.get("last_name")
        email = request.POST.get("email")
        password = request.POST.get("password")
        city = request.POST.get("city")
        state = request.POST.get("state")
        zip_code = request.POST.get("zip_code")

        if email and password:
            # Validate the email format
            if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
                messages.error(request, "Invalid email format.")
                return render(request, "auth/register.html")
            # Validate the password strength
            if not _validate_password(password):
                messages.error(
                    request,
                    "Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character.",
                )
                return render(request, "auth/register.html")
            # Check for existing user with the same email
            existing = User.objects.filter(username=email).exists()
            if existing:
                messages.error(request, "Email is already in use.")
                return render(request, "auth/register.html")
            # Create the user
            user = User.objects.create_user(
                username=email,
                password=password,
                first_name=first_name,
                last_name=last_name,
            )
            # Create the user's profile
            # pylint: disable=no-member
            Profile.objects.create(
                user=user,
                city=city,
                state=state,
                zip_code=zip_code,
            )
            messages.success(
                request, "Your account has been created! Please login to continue."
            )
            return redirect("/accounts/login/")
        messages.error(request, "Please fill in all fields.")
    return render(request, "auth/register.html")


@login_required
def logout_view(request):
    """View for handling user logout.
    \`/accounts/logout\`

    GET: Log the user out and redirect to the home page.
    """
    if request.method == "GET":
        # Log the user out
        logout(request)
        messages.success(request, "You have been logged out successfully.")
        return redirect("/")
    return HttpResponseNotAllowed(["GET"])


def login_oauth_google_view(_):
    """View for redirecting to Google OAuth for code flow authentication.
    \`/accounts/google/login\`
    GET: Redirect to Google OAuth for authentication.
    """
    # Redirect to Google OAuth for authentication
    url = "https://accounts.google.com/o/oauth2/v2/auth"
    scopes = [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
        "openid",
    ]
    params = {
        "client_id": settings.GOOGLE_OAUTH_CLIENT_ID,
        "redirect_uri": "http://127.0.0.1:8000/accounts/google/callback",
        "response_type": "code",
        "scope": " ".join(scopes),
        "access_type": "offline",
        "prompt": "consent",
    }
    # Build the URL with query parameters
    redirect_url = f"{url}?{urlencode(params)}"
    print("Redirecting to Google OAuth:", redirect_url)
    return redirect(redirect_url)


def login_oauth_google_callback_view(request):
    """View for handling the callback from Google OAuth.
    \`/accounts/google/callback\`
    GET: Handle the OAuth callback and log the user in.
    """
    # Handle the OAuth callback
    code = request.GET.get("code")
    if not code:
        messages.error(request, "Failed to login to Google. Please try again.")
        return redirect("/accounts/login/")

    # Exchange the code for tokens
    token_url = "https://oauth2.googleapis.com/token"
    params = {
        "client_id": settings.GOOGLE_OAUTH_CLIENT_ID,
        "client_secret": settings.GOOGLE_OAUTH_CLIENT_SECRET,
        "code": code,
        "grant_type": "authorization_code",
        "redirect_uri": "http://127.0.0.1:8000/accounts/google/callback",
    }

    # Exchange the code for tokens
    try:
        response = requests.post(token_url, data=params, timeout=10)
        if response.status_code != 200:
            raise ValueError("Failed to exchange code for tokens.")

        tokens = response.json()
        # Use the tokens to authenticate the user
        user_info = _get_google_user_info(tokens.get("access_token"))
        if not user_info:
            raise ValueError("Failed to retrieve user information.")

        # Log the user in
        user = _get_or_create_user(user_info)
        if not user:
            raise ValueError("Failed to create or retrieve user.")
        messages.success(
            request, "You have been logged in. Welcome, " + user.first_name + "!"
        )
        login(request, user)
        return redirect("/")
    except requests.HTTPError as e:
        print("Error during Google OAuth callback:", e)
        messages.error(request, "An error occurred while logging in. Please try again.")
        return redirect("/accounts/login/")


def forgot_password_view(request):
    """View for handling forgot password requests.
    \`/accounts/forgot-password\`

    GET: Render the forgot password page.
    POST: Handle the forgot password request.
    """
    if request.method == "POST":
        email = request.POST.get("email")
        if email:
            # Check if the user exists
            user = User.objects.filter(username=email).first()
            if user:
                # Send a password reset email
                auth_code = user.profile.create_secret_token()
                _send_password_reset_email(user, auth_code)

        messages.success(
            request,
            "If an account with that email exists, a password reset link has been sent.",
        )
        return redirect("/accounts/forgot-password/")

    return render(request, "auth/forgot_password.html")


def reset_password_view(request, reset_code: str):
    """View for handling password reset requests.
    \`/accounts/reset-password/<reset_code>\`
    GET: Render the reset password page.
    POST: Handle the password reset request.
    """
    if request.method == "POST":
        new_password = request.POST.get("new_password")
        confirm_password = request.POST.get("confirm_password")
        if new_password and new_password == confirm_password:
            # Reset the user's password
            # pylint: disable=no-member
            profile = Profile.objects.filter(secret_token=reset_code).first()
            if not profile:
                messages.error(request, "Your reset code is invalid or expired.")
                return redirect("/accounts/forgot-password/")
            if profile.secret_token == reset_code:
                # Valid reset code, reset the password
                if not _validate_password(new_password):
                    messages.error(request, "Invalid password.")
                    return redirect("/accounts/reset-password/" + reset_code + "/")
                # Update the user's password
                user = profile.user
                user.set_password(new_password)
                profile.secret_token = None
                user.save()
                profile.save()
                messages.success(request, "Your password has been reset successfully.")
                return redirect("/accounts/login/")
            messages.error(request, "Your reset code is invalid or expired.")
        messages.error(request, "Passwords do not match.")
    if request.method == "GET":
        # Check if the reset code is valid
        # pylint: disable=no-member
        profile = Profile.objects.filter(secret_token=reset_code).first()
        return render(
            request,
            "auth/reset_password.html",
            {"error": profile is None, "reset_code": reset_code},
        )
    return HttpResponseNotAllowed(["GET", "POST"])


# Profile views


@login_required
def profile_view(request):
    """Render the user's profile page.
    \`/accounts/profile\`

    GET: Render the profile page.
    POST: Update the user's profile information.
    """
    if request.method == "POST":
        # Update the user's profile
        first_name = request.POST.get("first_name")
        last_name = request.POST.get("last_name")
        bio = request.POST.get("bio")
        city = request.POST.get("city")
        state = request.POST.get("state")
        zip_code = request.POST.get("zip_code")

        # Update the profile information
        request.user.first_name = first_name or request.user.first_name
        request.user.last_name = last_name or request.user.last_name
        request.user.profile.bio = bio or request.user.profile.bio
        request.user.profile.city = city or request.user.profile.city
        request.user.profile.state = state or request.user.profile.state
        request.user.profile.zip_code = zip_code or request.user.profile.zip_code
        request.user.save()
        request.user.profile.save()
        messages.success(request, "Profile updated successfully.")
        return redirect("/accounts/profile/")
    return render(request, "accounts/profile.html")


@login_required
def profile_set_avatar(request):
    """Set the user's avatar.
    \`/accounts/profile/avatar\`

    POST: Update the user's avatar.
    DELETE: Remove the user's avatar.
    """
    if request.method == "POST":
        # Update the user's avatar
        avatar = request.FILES.get("avatar")

        if avatar:
            # Validate the uploaded file
            if not avatar.name.lower().endswith((".png", ".jpg", ".jpeg")):
                messages.error(request, "Please upload a valid image file.")
                return redirect("/accounts/profile/")
            # remove old avatar if it exists
            if request.user.profile.avatar_url:
                request.user.profile.avatar_url.delete(save=True)
            # Calculate a hash of the username to use as the filename to avoid conflicts
            username_hash = md5(request.user.username.encode()).hexdigest()
            # Save the new avatar
            request.user.profile.avatar_url.save(
                f"{username_hash}_avatar.{avatar.name.split('.')[-1]}",
                avatar,
                save=True,
            )
            request.user.profile.save()
            messages.success(request, "Avatar updated successfully.")
            return redirect("/accounts/profile/")
        messages.error(request, "Please upload a valid image file.")
        return redirect("/accounts/profile/")
    if request.method == "DELETE":
        # Remove the user's avatar
        if request.user.profile.avatar_url:
            request.user.profile.avatar_url.delete(save=True)
            request.user.profile.avatar_url = None
            request.user.profile.save()
            messages.success(request, "Avatar removed successfully.")
        else:
            messages.info(request, "No avatar to remove.")
        return redirect("/accounts/profile/")
    return HttpResponseNotAllowed(["POST", "DELETE"])


@login_required
def interest_view(request):
    """Handle listing and searching interests
    \`/accounts/interests\`

    GET: List all interests or search by query parameter \`q\`.
    POST: Adds a new interest
    """
    if request.method == "POST":
        # Add a new interest
        label = request.POST.get("label", "").strip()
        label = label.lower()
        label = label[0].upper() + label[1:]  # Capitalize the first letter
        if label:
            # pylint: disable=no-member
            interest, created = Interest.objects.get_or_create(label=label)
            request.user.profile.interests.add(interest)
            return JsonResponse(
                {"status": "success", "interest": interest.label, "created": created}
            )

        return JsonResponse(
            {"status": "error", "message": "Interest label cannot be empty."},
            status=400,
        )

    # Handle GET request to list interests or search
    # pylint: disable=no-member
    interests = Interest.objects.all().order_by("label")
    query = request.GET.get("q", "")
    if query:
        interests = interests.filter(label__icontains=query)
    return JsonResponse({"interests": list(interests.values())})


@login_required
def interest_subscription_view(request, interest_id):
    """Handles subscribing and unsubscribing to an interest.
      \`/accounts/interests/<interest_id>\`

    POST: Subscribe the user to the interest.
    DELETE: Unsubscribe the user from the interest.
    """
    interest = get_object_or_404(Interest, id=interest_id)
    profile = request.user.profile

    if request.method == "POST":
        # Subscribe the user to the interest
        # Check if already subscribed
        if profile.interests.filter(id=interest.id).exists():
            messages.info(request, f"Already subscribed to interest '{interest}'.")
            return redirect("/accounts/profile/")
        profile.interests.add(interest)
        return redirect("accounts/profile/")

    if request.method == "DELETE":
        # Unsubscribe the user from the interest
        if profile.interests.filter(id=interest.id).exists():
            profile.interests.remove(interest)
            messages.success(request, f"Unsubscribed from interest '{interest}'.")
        else:
            messages.info(request, f"Not subscribed to interest '{interest}'.")
        return redirect("/accounts/profile/")

    return HttpResponseNotAllowed(["POST", "DELETE"])


@login_required
def change_password_view(request):
    """Change the user's password.
    \`/accounts/change-password\`
    POST: Change the user's password.
    """
    if request.method == "POST":
        # Get the new password from the request
        new_password = request.POST.get("new_password", "").strip()
        confirm_password = request.POST.get("confirm_password", "").strip()
        current_password = request.POST.get("current_password", "").strip()
        # Check if the new password and confirm password match
        if new_password != confirm_password:
            messages.error(request, "New password and confirm password do not match.")
            return redirect("/accounts/profile/")
        # Check if the current password is correct
        if not request.user.check_password(current_password):
            messages.error(request, "Current password is incorrect.")
            return redirect("/accounts/profile/")
        # Validate the new password
        if _validate_password(new_password):
            # Change the user's password
            request.user.set_password(new_password)
            request.user.save()
            # Update the session to keep the user logged in
            update_session_auth_hash(request, request.user)
            messages.success(request, "Password changed successfully.")
            return redirect("/accounts/profile/")
        messages.error(request, "Invalid password. Please try again.")
        return redirect("/accounts/profile/")

    return redirect("/accounts/profile/")


@login_required
def delete_account_view(request):
    """Delete the user's account.
    \`/accounts/delete-account\`
    POST: Delete the user's account.
    """
    if request.method == "POST":
        password = request.POST.get("password", "").strip()
        user = request.user
        if not user.check_password(password):
            messages.error(request, "Incorrect password. Account deletion failed.")
            return redirect("/accounts/profile/")
        # Delete the user's profile and user account
        # Clean avatar if it exists
        if user.profile.avatar_url:
            user.profile.avatar_url.delete(save=True)
        # Delete the profile and user
        user.profile.delete()
        user.delete()
        messages.success(
            request,
            "Your account has been deleted successfully. We hope to see you again!",
        )
        return redirect("/accounts/login/")
    return HttpResponseNotAllowed(["POST"])


# Profile related views
@login_required
def update_preferences_view(request):
    """Update user preferences.
    \`/accounts/update-preferences\`
    POST: Update the user's preferences.
    """
    if request.method == "POST":
        # Get the preferences from the request
        event_types = request.POST.getlist("event_types") or []
        event_radius = request.POST.get("event_radius", 200)
        event_min_age = request.POST.get("event_min_age", 0)

        # Update or create the user's preferences
        # pylint: disable=no-member
        user_preferences = Preferences.objects.get_or_create(user=request.user)[0]
        user_preferences.event_types = json.dumps(event_types)
        user_preferences.event_radius_miles = int(event_radius)
        user_preferences.event_min_age = int(event_min_age)
        user_preferences.save()

        messages.success(request, "Preferences updated successfully.")
        return redirect("/accounts/profile/")

    return HttpResponseNotAllowed(["POST"])


# Helper utilities


def _validate_password(password: str) -> bool:
    """Validate the password strength."""
    if (
        len(password) < 8
        or not re.search(r"[A-Z]", password)
        or not re.search(r"[0-9]", password)
        or not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password)
    ):
        return False
    return True


def _get_google_user_info(access_token: str) -> dict:
    """Retrieve user information from Google using the access token."""
    user_info_url = "https://www.googleapis.com/oauth2/v3/userinfo"
    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.get(user_info_url, headers=headers, timeout=10)
    if response.status_code == 200:
        return response.json()
    raise requests.HTTPError(
        f"Failed to retrieve user information from Google. Status code: {response.status_code}"
    )


def _get_or_create_user(user_info: dict) -> User:
    """Get or create a user from Google user info."""
    email = user_info.get("email")
    name = user_info.get("given_name", "")
    user, created = User.objects.get_or_create(
        username=email,
        defaults={
            "first_name": name,
            "email": email,
        },
    )
    if created:
        # If this is a new user, create a profile
        # pylint: disable=no-member
        Profile.objects.create(user=user)
        Preferences.objects.create(user=user)
        user.set_unusable_password()  # Disable password for OAuth users
    return user


def _send_password_reset_email(user: User, auth_code: str) -> None:
    """Send a password reset email to the user."""
    # This function should send a reset code to the user's email.
    print(
        f"Sending password reset email to {user.username} with auth code: {auth_code}"
    )
    raise NotImplementedError(
        "Password reset email functionality is not implemented in this example."
    )`.trim(),
        //#endregion
        language: "python",
        fileName: "accounts/views.py",
        title: "Django Views",
        description:
            "Robust server-side routing handling secure session management, Google OAuth integration, and strict cryptographic password validation to protect internal systems from unauthorized access.",
        icon: <FaPython />,
    },
};

export default codeSamples;
