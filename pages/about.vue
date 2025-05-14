<template>
  <div class="w-full flex flex-col items-center pt-6 pb-16">
    <section class="w-11/12 md:w-10/12 grid grid-cols-12 gap-6">
      <div class="col-span-12 md:col-span-8 grid grid-cols-12 gap-4">
        <Paper class="col-span-12 flex flex-col">
          <h1 class="text-primary text-4xl font-header">Sobre o Pros4Noobs</h1>
          <p>
            A pros4noobs é uma iniciativa sem fins lucrativos que conecta desenvolvedores
            experientes (pros) com pessoas que estão começando (noobs) de forma gratuita, justa e
            consciente.
          </p>
        </Paper>
        <Paper class="col-span-12">
          <h1 class="font-header text-primary text-2xl">Uma lanterna?</h1>
          <p class="">
            Porque o caminho para aprender a programar é escuro no começo. É cheio de dúvidas,
            decisões difíceis, caminhos que parecem não levar a lugar algum e muitos momentos de
            desânimo. A lanterna representa o que o projeto se propõe a ser:

            <span class="block p-2 border-l-2 border-primary bg-info/10 my-4">
              Um facho de luz para quem está começando, não um atalho mágico.
            </span>

            Ela não carrega ninguém no colo — só ilumina o próximo passo. Não resolve tudo — só
            ajuda a enxergar o que antes parecia impossível. E, assim como na vida real, quem segura
            a lanterna está ao lado, não acima.
          </p>

          <ul class="list-disc list-inside flex flex-col gap-2 mt-4">
            <li>
              Mentores não são gurus — são só pessoas que já passaram pelo caminho e decidiram
              estender a mão.
            </li>
            <li>A luz não é pra mostrar o fim, mas pra guiar com clareza o início.</li>
            <li>
              Cada pro segura uma lanterna diferente, e juntas, elas formam um caminho mais seguro
              para quem vem depois.
            </li>
          </ul>
        </Paper>
      </div>
      <div class="col-span-12 md:col-span-4 h-full flex items-center justify-center">
        <img
          src="/public/p4n-logo.svg"
          class=""
          alt="Logo
        do Pros4Noobs"
        />
      </div>
    </section>

    <section class="text-lg w-10/12 text-justify mt-6">
      <p>
        <span class="font-semibold text-primary">Pros4Noobs</span>
        conecta quem está começando na área de tecnologia (<em>noobs</em>) com profissionais
        experientes (<em>pros</em>).
      </p>

      <p class="p-2 border-l-2 border-primary bg-info/10 my-4">
        Nosso objetivo é simples:
        <strong>quebrar a barreira de entrada na área tech</strong> e mostrar que você não precisa
        de cursos caros ou QI para dar o primeiro push no seu repositório — só de alguém que te
        diga:
        <em>“tamo junto, vamo lá!”</em>
      </p>
    </section>

    <section class="w-11/12 md:w-10/12 my-6">
      <h2 class="text-2xl font-semibold font-header text-primary text-center">
        Por que existimos?
      </h2>
      <p class="text-center">
        Porque sabemos como é começar do zero. A dúvida, o medo, o “será que sou bom o
        suficiente?”.<br />
        A gente passou por isso. E agora queremos devolver à comunidade o que ela nos deu:
        <strong>oportunidades reais</strong>.
      </p>
    </section>

    <!-- <section class="space-y-4">
      <h2 class="text-2xl font-semibold">🤝 Como funciona?</h2>
      <ol class="list-decimal ml-5 space-y-2">
        <li>
          Você se cadastra como <strong>noob</strong> ou <strong>pro</strong>.
        </li>
        <li>
          Nosso sistema de matching automático conecta você com alguém
          compatível com seu perfil, objetivos e área de interesse.
        </li>
        <li>
          A mentoria acontece do seu jeito — pode ser uma conversa rápida,
          revisão de portfólio, pair programming ou aquele papo reto sobre
          carreira.
        </li>
        <li>Sem pagar. Sem promessas falsas. Só gente querendo ajudar.</li>
      </ol>
    </section> -->

    <section class="w-11/12 md:w-10/12 space-y-2 text-center">
      <h2 class="text-2xl font-semibold font-header text-primary">Para quem é?</h2>

      <span class="block">
        <strong>Noobs:</strong> quem quer aprender programação, entrar no mercado ou ter alguém com
        quem contar nessa jornada.
      </span>

      <span class="block">
        <strong>Pros:</strong> quem já trabalha com tecnologia e quer compartilhar experiência de
        forma leve, voluntária e significativa.
      </span>
    </section>

    <section
      class="w-full flex items-center justify-center bg-gradient-to-tl from-primary/40 via-black to-secondary/20 py-12 text-center text-neutral my-10"
    >
      <div class="flex flex-col gap-4 w-11/12 md:10/12">
        <h2 class="text-2xl font-semibold font-header text-primary">✨ Nossos valores</h2>
        <p>Gratuidade com propósito</p>
        <p>Mentoria com empatia</p>
        <p>Compartilhamento real, sem ego</p>
        <p>Caminhar junto é melhor do que sozinho</p>
      </div>
    </section>

    <section class="w-11/12 md:w-10/12 space-y-6 text-center">
      <p class="text-neutral">
        Se você está começando, a gente te ajuda.<br />
        Se você já chegou lá, ajude alguém a chegar também.
      </p>
      <p class="text-xl font-bold text-neutral">
        Bem-vindo ao <span class="text-primary">Pros4Noobs</span>. Bora codar juntos.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts"></script>
