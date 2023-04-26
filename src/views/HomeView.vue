<script setup>
import {
    mdiHandWaveOutline,
    mdiGithub,
    mdiOpenInNew,
    mdiWeb,
    mdiMemory,
} from "@mdi/js";
</script>

<template>
    <main>
        <section class="min-h-screen bg-white dark:bg-gray-900">
            <div
                class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div class="mr-auto place-self-center lg:col-span-7">
                    <h1
                        class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-relaxed md:text-5xl xl:text-6xl dark:text-white">
                        I create interactive experiences for the web
                    </h1>
                    <p
                        class="max-w-2xl mb-6 font-light leading-relaxed text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                        I am a full-stack web developer with a passion for
                        creating interactive and intuitive web applications that
                        solve real problems.
                    </p>
                    <div class="flex items-center">
                        <button
                            type="button"
                            class="inline-flex items-center text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 rounded-lg px-5 py-3 text-base font-medium text-center mr-3">
                            <svg-icon :path="mdiWeb" type="mdi" class="mr-2" />
                            Discuss your project
                        </button>
                        <a
                            href="#"
                            class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                            Explore my work
                        </a>
                        <a
                            href="https://github.com/col-bc"
                            target="_blank"
                            class="inline-flex items-center justify-center p-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                            <svg-icon :path="mdiGithub" type="mdi" />
                        </a>
                    </div>
                </div>
                <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    <img
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
                        alt="mockup" />
                </div>
            </div>
        </section>

        <section class="min-h-screen">
            <div class="px-4 mx-auto max-w-screen-xl">
                <div class="flex items-center gap-3 mb-4">
                    <svg-icon :path="mdiMemory" type="mdi" class="w-12 h-12" />
                    <h1
                        class="text-4xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-white">
                        Technology
                    </h1>
                </div>
                <p
                    class="mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 leading-loose">
                    I have experience with a wide range of technologies and
                    frameworks for both front-end and back-end development.
                    These are some of the industry standard technologies I use
                    to build interactive web applications. Below are some of the
                    different technologies I use for front-end, back-end and
                    microservices.
                </p>
            </div>
        </section>

        <section class="min-h-screen">
            <div class="px-4 mx-auto max-w-screen-xl">
                <h1
                    class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-white">
                    My Projects
                </h1>
                <p
                    class="mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                    Here are some of the projects I have worked on recently. I
                    am always looking for new opportunities to work on exciting
                    projects, so if you have a project you think I would be a
                    good fit for, please get in touch.
                </p>
                <div class="grid gird-cols-1 md:grid-cols-2 gap-8">
                    <div
                        class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img
                                class="rounded-t-lg"
                                src="@/assets/img/sire.png"
                                alt="" />
                        </a>
                        <div class="p-5">
                            <a href="#">
                                <h5
                                    class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    SIRE
                                </h5>
                            </a>
                            <p
                                class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Sire is a web application that you to manage,
                                and sell your sneaker inventory.
                            </p>
                            <a
                                href="https://sireapp.io"
                                target="_blank"
                                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                                Live Demo
                                <svg-icon
                                    :path="mdiOpenInNew"
                                    type="mdi"
                                    class="w-4 h-4 ml-1" />
                            </a>
                        </div>
                    </div>

                    <div
                        class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img
                                class="rounded-t-lg"
                                src="@/assets/img/intellectual-space.png"
                                alt="" />
                        </a>
                        <div class="p-5">
                            <a
                                href="https://my-intellectual-space.firebaseapp.com/"
                                target="_blank">
                                <h5
                                    class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    My Intellectual space
                                </h5>
                            </a>
                            <p
                                class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology
                                acquisitions of 2021 so far, in reverse
                                chronological order.
                            </p>
                            <a
                                href="https://my-intellectual-space.firebaseapp.com/"
                                target="_blank"
                                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                                Live Demo
                                <svg-icon
                                    :path="mdiOpenInNew"
                                    type="mdi"
                                    class="w-4 h-4 ml-1" />
                            </a>
                        </div>
                    </div>

                    <div
                        class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img
                                class="rounded-t-lg"
                                src="https://loremflickr.com/640/360"
                                alt="" />
                        </a>
                        <div class="p-5">
                            <a href="#">
                                <h5
                                    class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Noteworthy technology acquisitions 2021
                                </h5>
                            </a>
                            <p
                                class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology
                                acquisitions of 2021 so far, in reverse
                                chronological order.
                            </p>
                            <a
                                href="#"
                                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                                Read more
                                <svg
                                    aria-hidden="true"
                                    class="w-4 h-4 ml-2 -mr-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fill-rule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div
                        class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img
                                class="rounded-t-lg"
                                src="https://loremflickr.com/640/360"
                                alt="" />
                        </a>
                        <div class="p-5">
                            <a href="#">
                                <h5
                                    class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Noteworthy technology acquisitions 2021
                                </h5>
                            </a>
                            <p
                                class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology
                                acquisitions of 2021 so far, in reverse
                                chronological order.
                            </p>
                            <a
                                href="#"
                                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                                Read more
                                <svg
                                    aria-hidden="true"
                                    class="w-4 h-4 ml-2 -mr-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fill-rule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div
                        class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img
                                class="rounded-t-lg"
                                src="https://loremflickr.com/640/360"
                                alt="" />
                        </a>
                        <div class="p-5">
                            <a href="#">
                                <h5
                                    class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Noteworthy technology acquisitions 2021
                                </h5>
                            </a>
                            <p
                                class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology
                                acquisitions of 2021 so far, in reverse
                                chronological order.
                            </p>
                            <a
                                href="#"
                                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                                Read more
                                <svg
                                    aria-hidden="true"
                                    class="w-4 h-4 ml-2 -mr-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fill-rule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div
                        class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img
                                class="rounded-t-lg"
                                src="https://loremflickr.com/640/360"
                                alt="" />
                        </a>
                        <div class="p-5">
                            <a href="#">
                                <h5
                                    class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Noteworthy technology acquisitions 2021
                                </h5>
                            </a>
                            <p
                                class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology
                                acquisitions of 2021 so far, in reverse
                                chronological order.
                            </p>
                            <a
                                href="#"
                                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                                Read more
                                <svg
                                    aria-hidden="true"
                                    class="w-4 h-4 ml-2 -mr-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fill-rule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <p>
            Pulvinar nibh sollicitudin suscipit. Porttitor, tortor viverra
            facilisi morbi. Sociosqu curabitur auctor ridiculus sed magnis
            vivamus etiam. Suscipit porta suscipit mi, suspendisse facilisis
            velit ridiculus amet platea maecenas. Eros tempor sagittis libero
            aliquet odio dapibus mauris faucibus facilisi netus ligula cursus!
            Lectus egestas fusce dis. Molestie nam lacinia condimentum urna
            litora augue posuere commodo accumsan. Sagittis vivamus sociis nam
            quam penatibus tortor fermentum pretium risus pulvinar orci.
            Tincidunt tellus congue curabitur lobortis fermentum parturient elit
            maecenas metus accumsan sociis. Praesent penatibus elementum auctor
            turpis et litora inceptos pulvinar est tristique dignissim velit.
            Ligula dictum primis massa nisi platea risus suspendisse egestas
            dictum inceptos. Primis et luctus cursus ad eget? Dictum ridiculus
            lobortis cursus magna semper inceptos dignissim pulvinar diam. Sit
            eu at libero aenean. Nisi proin natoque lacus nunc dui quam praesent
            praesent duis, magna quam a.
        </p>
        <p>
            Mus vehicula gravida cubilia donec dictum sem sodales porta. Urna
            sapien per molestie venenatis quisque consectetur ridiculus sapien
            lobortis consequat adipiscing facilisis. Integer hendrerit eros
            natoque volutpat facilisi cras lectus. Nunc ultricies amet pulvinar
            nec neque donec placerat inceptos lectus quisque. Id a vivamus mi
            scelerisque magnis nulla natoque elementum, tincidunt dis. Non non
            lectus sagittis parturient pellentesque? Faucibus id habitant tempor
            laoreet vehicula. Integer eleifend tempor risus amet vestibulum
            vehicula mi bibendum amet velit! Vestibulum arcu blandit nec diam
            tristique arcu dis erat facilisi magnis dis.
        </p>
        <p>
            Pellentesque sociosqu diam faucibus hac, arcu porta. Varius
            facilisis nibh vulputate auctor. Imperdiet nostra porttitor lobortis
            natoque ad dignissim aliquet. Inceptos; tincidunt per mollis.
            Praesent blandit bibendum odio, purus iaculis mauris. Dolor curae;
            montes magnis fermentum ultrices aliquam congue turpis sapien donec.
            Torquent sociosqu sociosqu potenti nostra pretium mattis dui
            sociosqu elit fusce erat eu!
        </p>
        <p>
            Sapien neque magna orci aptent. Mi elementum ridiculus est mi
            ridiculus cursus. Purus pulvinar urna varius urna malesuada id
            montes elementum, molestie feugiat. Sodales nam scelerisque arcu id
            mi. Mattis sagittis convallis dignissim cras, facilisi lectus ut.
            Etiam montes congue leo vitae cras sed. Tempor porttitor cursus
            suspendisse habitant amet platea, viverra egestas libero dis lacus?
            Penatibus imperdiet eget lorem suspendisse primis faucibus ipsum
            vivamus eros velit. Duis sociosqu semper tempor ridiculus suscipit
            leo dolor. Nisl, cras fringilla congue. Mi dignissim himenaeos quam.
            Fringilla magnis odio inceptos. Egestas cubilia nibh auctor et.
            Aenean tellus nulla eleifend congue montes platea blandit. Odio
            pretium consectetur cum in. Bibendum curabitur mollis nisi mauris!
            Malesuada arcu, morbi dui potenti ac feugiat sollicitudin purus
            vulputate purus! Suspendisse nascetur a sollicitudin facilisis.
        </p>
        <p>
            Ad suspendisse ultricies porta semper id, magnis posuere nisi eu
            adipiscing vivamus. Pretium varius est aliquam pharetra, adipiscing
            tellus. Platea velit lacinia netus aptent sagittis vivamus nisi
            sociis. Tempus egestas cursus euismod. Conubia phasellus lobortis
            non ornare feugiat nostra vestibulum sem. Facilisi porttitor ut ac
            vivamus potenti porta tempus habitasse feugiat primis. Scelerisque
            suscipit vel nibh est torquent sodales per. Sodales platea cubilia
            ad iaculis, libero quam quis erat urna diam hendrerit nunc. Libero
            elementum nibh et class tempus!
        </p>
        <p>
            Vulputate mus commodo ante netus tristique penatibus eros purus
            vitae augue ultricies. Sodales platea eleifend imperdiet varius
            pellentesque viverra etiam varius cum fusce. Litora lacus nisi
            ligula purus mattis fusce. Inceptos, tincidunt est himenaeos
            inceptos. Himenaeos felis phasellus odio montes dolor! Phasellus nec
            montes molestie sollicitudin purus facilisi amet scelerisque vitae
            sed sem mi. Cras praesent nisi sociis vel mauris eu rutrum libero?
            In eros penatibus congue risus mattis iaculis dapibus quam euismod
            sagittis. Curabitur taciti, enim commodo augue?
        </p>
        <p>
            Elementum id, porttitor suscipit arcu elit nisi taciti arcu tortor
            rutrum in. Rhoncus integer himenaeos imperdiet dui taciti placerat
            vulputate tempus tincidunt habitant habitant nisl? Leo dis, senectus
            aliquam! Orci hac ultricies eu vulputate torquent dui vehicula
            blandit vestibulum? Dignissim gravida interdum dui accumsan erat
            adipiscing blandit dignissim tempor cum, viverra aliquam. Elementum
            dis libero malesuada aliquam proin vulputate elit convallis
            scelerisque suspendisse. Feugiat quis turpis adipiscing elit?
        </p>
        <p>
            Convallis cubilia eros feugiat nibh varius volutpat lacus nisl
            lacus. Volutpat penatibus risus class condimentum mus nibh
            ullamcorper urna posuere mauris. Nisl urna ullamcorper laoreet
            montes inceptos non vivamus curae; montes vitae nibh quam. Cum
            imperdiet nascetur mus libero curabitur urna malesuada consequat
            mollis primis suspendisse? Est, ornare purus molestie molestie
            luctus dapibus consequat praesent phasellus dictum. Parturient
            tempor dignissim purus. In justo ad fames etiam cubilia felis
            nascetur nisi! Feugiat pretium bibendum ante sem? Pulvinar tempus
            malesuada; viverra dapibus ut ad? Erat lobortis fusce metus nisl
            tortor habitant suspendisse tempor est sagittis sem? Sollicitudin
            convallis suscipit eleifend erat nisl commodo condimentum et. Nulla
            ad placerat congue varius fringilla velit. Senectus euismod proin
            habitant pharetra sociis tincidunt justo sagittis auctor cursus nam.
            Lorem fermentum dictumst nec sed laoreet blandit congue praesent!
        </p>
        <p>
            Senectus, sociis elit lacus eros tristique ut. Felis et imperdiet
            nascetur tristique, penatibus elementum scelerisque nostra mus
            suspendisse. Posuere, suscipit tempor dictumst quam fermentum a
            posuere facilisi rhoncus suscipit et. Elit donec dictumst consequat
            iaculis dolor parturient. Lacus parturient ligula eleifend tellus
            elit. Tellus sollicitudin class sociosqu, faucibus pulvinar arcu
            arcu tempor proin consectetur elementum massa? Ad, nascetur ante
            penatibus ante malesuada egestas feugiat condimentum. Fermentum sem
            netus gravida magna. Parturient, fermentum integer varius integer
            iaculis aliquam ullamcorper hac? Lobortis augue convallis eleifend
            mi egestas. Per vel tempus condimentum bibendum nostra malesuada
            vitae eleifend taciti ac consequat mollis. Metus dis commodo turpis
            faucibus lacus tempor rhoncus sem diam platea iaculis. Eros taciti
            tincidunt lobortis sociosqu convallis. Facilisi class id ad. Nunc
            lobortis ullamcorper sodales orci nisl quis faucibus a odio
            interdum? Hac risus.
        </p>
    </main>
</template>
