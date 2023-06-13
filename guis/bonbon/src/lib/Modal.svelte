<svelte:options tag="bonbon-modal" />

<script>
  import BonbonLogo from './BonbonLogo.svelte';

  let form;

  const setCookie = (cname, cvalue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };

  const uint8ToHex = (uint8) => {
    return Array.from(uint8)
      .map((i) => i.toString(16).padStart(2, '0'))
      .join('');
  };

  const generateHEM = async (email) => {
    const encoder = new TextEncoder();
    const salt = uint8ToHex(crypto.getRandomValues(new Uint8Array(16)));
    const data = encoder.encode(email + salt);
    const buffer = await crypto.subtle.digest("SHA-256", data);
    return uint8ToHex(new Uint8Array(buffer));
  };
</script>

<style>
  main { 
    color: #9d9d9d;
  }
</style>

<main>
  <div>
    <h4>Join our newsletter</h4>
    <form bind:this={form}>
      <input type="email" id="email" required/>
      <button on:click={async () => {
        if(form.checkValidity()) {
          const email = document.getElementById("email");
          const hem = await generateHEM(email);
          setCookie('__bonbon_hem', hem, 30);
        }
      }}>Submit</button>
    </form>
    <p>
      powered by <bonbon-logo />
    </p>
  </div>
</main>