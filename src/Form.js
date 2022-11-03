import React, { useState } from "react"
import Select from 'react-select'
import { backend } from './backend.js'
import { useAsync } from "./useAsync.js";
import { capitalize, toSelectOptions } from "./utils.js";
import CreatableSelect from 'react-select/creatable';

const Form = () => {
  const [rozpocty, rozpoctySettled] = useAsync(() => backend.getBudgets());
  const [vybranyRozpocet, nastavRozpocet] = useState();
  const [vybranaPolozka, nastavPolozku] = useState();

  const [dodavatele, dodavateleSettled] = useAsync(() => backend.getSuppliers());
  const dodavateleLoading = !dodavateleSettled;

  let dodavateleOptions
  if(dodavateleSettled){
    dodavateleOptions = toSelectOptions(dodavatele.map(p => p.name));
  }

  const [vybranyDodavatel, nastavDodavatele] = useState();
  const [vybraneDPH, nastavDPH] = useState();

  const rozpoctyLoading = !rozpoctySettled;

  const rozpoctyOptions = toSelectOptions(Object.keys(rozpocty ?? {}));

  const polozky = rozpocty?.[vybranyRozpocet] ?? [];
  const polozkyOptions = toSelectOptions(polozky.map(p => p.name));


    /** @type {[string, Function]} */
    const [user, userSettled] =  useAsync(() => backend.getUser());

    const EMAIL_REGEX = /^(\w+)\.(\w+)@/;
    let [_, firstName, surname] = user?.match(EMAIL_REGEX) ?? [];
    firstName = capitalize(firstName ?? '');
    surname = capitalize(surname ?? '');


  const sazbaDPH = toSelectOptions(['21%','15%','10%','0%']);

  function submit() {
    const getValueOf = id => document.getElementById(id)?.value;
    const rec = {
        firstName: getValueOf('firstName'),
        surname: getValueOf('surname'),
        user,
        subject: getValueOf('subject'),
        dodavatel:vybranyDodavatel,
        rozpocet: vybranyRozpocet,
        polozka: vybranaPolozka,
        price: getValueOf('price'),
        dph: vybraneDPH,
        date: getValueOf('date'),
    }
    backend.AddRecord(rec);
  }

  return <div id="form">
    <input id="firstName" type="text" value={firstName} placeholder="Jméno" readonly/>
    <input id="surname" type="text" value={surname} placeholder="Příjmení" readonly/>
    <input id="subject" type="text" placeholder="Předmět nákupu" />
    <CreatableSelect isClearable options={dodavateleOptions} isLoading={dodavateleLoading} onChange={v => nastavDodavatele(v.value)} placeholder="Dodavatel"/>
    <Select isLoading={rozpoctyLoading} options={rozpoctyOptions} onChange={v => nastavRozpocet(v.value)} placeholder="Rozpočet" />
    <Select isLoading={rozpoctyLoading} options={polozkyOptions} onChange={v => nastavPolozku(v.value)} placeholder="Podskupina" />

    <input id="price" type="text" placeholder="Cena" />
    <Select options={sazbaDPH} onChange={v => nastavDPH(v.value)} placeholder="Sazba DPH" />

    <input id="date" type="date"/>
    <input id="attachment" type="file" multiple />

    <button onClick={submit}>Nahrát doklad</button>
  </div>;
};

export default Form;
