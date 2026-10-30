// The hero's brand moment: "Every interface", told once on load with the components themselves.
// One payment crosses four surfaces and four Qeet products: a passkey sign-in on a phone (Qeet ID),
// a hosted checkout in a browser (Qeet Pay), a notification (Qeet Notify) and the event stream
// (Qeet Logs). The story is a picture: hidden from assistive technology and inert. Its two controls,
// the language and Replay, are real. In Hindi the components' own strings and formats follow too.
import { ArrowRightIcon } from "@qeetrix/icons/icons/arrow-right";
import { BatteryFullIcon } from "@qeetrix/icons/icons/battery-full";
import { BellIcon } from "@qeetrix/icons/icons/bell";
import { ChevronDownIcon } from "@qeetrix/icons/icons/chevron-down";
import { CircleCheckIcon } from "@qeetrix/icons/icons/circle-check";
import { ClockIcon } from "@qeetrix/icons/icons/clock";
import { FingerprintPatternIcon } from "@qeetrix/icons/icons/fingerprint-pattern";
import { LockIcon } from "@qeetrix/icons/icons/lock";
import { MapPinIcon } from "@qeetrix/icons/icons/map-pin";
import { RotateCcwIcon } from "@qeetrix/icons/icons/rotate-ccw";
import { ScanFaceIcon } from "@qeetrix/icons/icons/scan-face";
import { ShieldCheckIcon } from "@qeetrix/icons/icons/shield-check";
import { SignalHighIcon } from "@qeetrix/icons/icons/signal-high";
import { WifiIcon } from "@qeetrix/icons/icons/wifi";
import {
  Avatar,
  Badge,
  Button,
  formatCurrency,
  formatDate,
  mirrorInRtl,
  QeetrixProvider,
  Radio,
  RadioGroup,
  Spinner,
  Text,
  TextField,
  Toggle,
  ToggleGroup,
} from "@qeetrix/react";
import { useCallback, useEffect, useRef, useState } from "react";

const Forward = mirrorInRtl(ArrowRightIcon);
type Lang = "en" | "hi";
const AMOUNT = 48200;
const copy = {
  en: {
    locale: "en-IN",
    welcome: "Welcome back",
    signIn: "Sign in to Acme",
    passkey: "Use passkey",
    other: "Other ways to sign in",
    protectedBy: "Protected by Qeet ID",
    sheetTitle: "Use your passkey?",
    sheetBody: "Sign in to id.qeet.in as priya@acme.in",
    cont: "Continue",
    cancel: "Cancel",
    done: "You're signed in",
    doneSub: "Welcome back, Priya",
    factPasskey: "Passkey",
    factSession: "Session",
    session: "8 hours",
    factPlace: "Location",
    place: "Mumbai",
    continueTo: "Open Acme",
    amountDue: "Amount due",
    due: (d: string) => `Due ${d}`,
    payWith: "Pay with",
    upi: "UPI",
    card: "Card",
    bank: "Netbanking",
    upiId: "UPI ID",
    pay: (a: string) => `Pay ${a}`,
    paid: "Payment complete",
    receipt: "Receipt sent to priya@acme.in",
    secured: "Secured by Qeet Pay",
    toast: "Payment received",
    toastBody: (a: string) => `${a} from Priya Sharma, Acme`,
    now: "now",
  },
  hi: {
    locale: "hi-IN",
    welcome: "फिर से स्वागत है",
    signIn: "Acme में साइन इन करें",
    passkey: "पासकी इस्तेमाल करें",
    other: "साइन इन के दूसरे तरीके",
    protectedBy: "Qeet ID द्वारा सुरक्षित",
    sheetTitle: "अपनी पासकी इस्तेमाल करें?",
    sheetBody: "priya@acme.in के रूप में id.qeet.in में साइन इन करें",
    cont: "जारी रखें",
    cancel: "रद्द करें",
    done: "आप साइन इन हो गए हैं",
    doneSub: "फिर से स्वागत है, प्रिया",
    factPasskey: "पासकी",
    factSession: "सत्र",
    session: "8 घंटे",
    factPlace: "जगह",
    place: "मुंबई",
    continueTo: "Acme खोलें",
    amountDue: "देय राशि",
    due: (d: string) => `देय तिथि ${d}`,
    payWith: "भुगतान का तरीका",
    upi: "UPI",
    card: "कार्ड",
    bank: "नेटबैंकिंग",
    upiId: "UPI आईडी",
    pay: (a: string) => `${a} का भुगतान करें`,
    paid: "भुगतान पूरा हुआ",
    receipt: "रसीद priya@acme.in पर भेजी गई",
    secured: "Qeet Pay द्वारा सुरक्षित",
    toast: "भुगतान प्राप्त हुआ",
    toastBody: (a: string) => `प्रिया शर्मा, Acme से ${a}`,
    now: "अभी",
  },
};

/** The story's beats, in milliseconds from the start. The last beat is the finished picture. */
const beats = [150, 450, 750, 1300, 1900, 2600, 3100, 3800, 4200];
const FINAL = beats.length;

export default function HeroStory() {
  const [lang, setLang] = useState<Lang>("en");
  const [step, setStep] = useState(FINAL);
  const [ready, setReady] = useState(false);
  const [motion, setMotion] = useState(false);
  const [scheme, setScheme] = useState("light");
  const timers = useRef<number[]>([]);

  const play = useCallback(() => {
    for (const t of timers.current) clearTimeout(t);
    setStep(0);
    timers.current = beats.map((at, i) => window.setTimeout(() => setStep(i + 1), at));
  }, []);

  // The phone is always a dark device; its screen follows the page's scheme.
  useEffect(() => {
    const root = document.documentElement;
    const sync = () =>
      setScheme(root.getAttribute("data-qx-color-scheme") === "dark" ? "dark" : "light");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["data-qx-color-scheme"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const allowed = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    setMotion(allowed);
    setReady(true);
    if (allowed) play();
    return () => {
      for (const t of timers.current) clearTimeout(t);
    };
  }, [play]);

  const t = copy[lang];
  const amount = formatCurrency(AMOUNT, "INR", t.locale);
  const is = (n: number) => (step >= n ? "" : undefined);
  const phone = step >= 6 ? "done" : step === 5 ? "verify" : step === 4 ? "sheet" : "page";

  return (
    <div className="home-story-wrap">
      <QeetrixProvider locale={t.locale}>
        <div
          className="home-story"
          data-ready={ready ? "" : undefined}
          lang={lang}
          aria-hidden="true"
          inert
        >
          {/* Qeet Pay: the hosted checkout, in a browser window. */}
          <div className="home-frag home-pay" data-in={is(1)}>
            <div className="home-window-bar">
              <span className="home-dots">
                <i />
                <i />
                <i />
              </span>
              <span className="home-url">
                <LockIcon size={12} />
                pay.qeet.in/acme
              </span>
            </div>
            <div className="home-pay-body">
              <div className="home-pay-head">
                <Avatar name="Acme Corp" shape="square" size="sm" />
                <span>
                  <b>Acme Pvt Ltd</b>
                  <Text size="sm" tone="subtle">
                    INV-2047
                  </Text>
                </span>
              </div>
              <div className="home-pay-amount">
                <Text size="sm" tone="subtle">
                  {t.amountDue}
                </Text>
                <strong>{amount}</strong>
                <Text size="sm" tone="subtle">
                  {t.due(formatDate("2026-10-30", t.locale))}
                </Text>
              </div>
              <RadioGroup label={t.payWith} orientation="horizontal" defaultValue="upi">
                <Radio value="upi" label={t.upi} />
                <Radio value="card" label={t.card} />
                <Radio value="bank" label={t.bank} />
              </RadioGroup>
              <TextField label={t.upiId} defaultValue="priya@okaxis" readOnly />
              <div className="home-pay-action">
                <div className="home-swap" data-on={is(8)}>
                  <Button size="lg" fullWidth icon={LockIcon} loading={step === 7}>
                    {t.pay(formatCurrency(AMOUNT, "INR", t.locale, { maximumFractionDigits: 0 }))}
                  </Button>
                  <div className="home-pay-done">
                    <CircleCheckIcon size={20} />
                    <span>
                      <b>{t.paid}</b>
                      <Text size="sm" tone="subtle">
                        {t.receipt}
                      </Text>
                    </span>
                  </div>
                </div>
              </div>
              <Text size="sm" tone="subtle" render={<p className="home-pay-foot" />}>
                <ShieldCheckIcon size={16} />
                {t.secured}
              </Text>
            </div>
          </div>

          {/* Qeet ID: the passkey sign-in, on a phone. */}
          <div className="home-frag home-phone" data-in={is(2)} data-qx-color-scheme="dark">
            <div className="home-phone-screen" data-qx-color-scheme={scheme} data-state={phone}>
              <div className="home-ph-status">
                <span>9:41</span>
                <span className="home-phone-notch" data-qx-color-scheme="dark" />
                <span className="home-ph-icons">
                  <SignalHighIcon size={12} />
                  <WifiIcon size={12} />
                  <BatteryFullIcon size={14} />
                </span>
              </div>
              <div className="home-ph-url">
                <LockIcon size={10} />
                id.qeet.in
              </div>
              <div className="home-ph-view">
                {/* Choose the account, then the passkey. */}
                <div className="home-ph-page">
                  <div className="home-ph-brand">
                    <span className="home-ph-mark">A</span>
                    <b>Acme</b>
                  </div>
                  <div className="home-ph-hello">
                    <b>{t.welcome}</b>
                    <span>{t.signIn}</span>
                  </div>
                  <div className="home-ph-account">
                    <Avatar name="Priya Sharma" size="sm" />
                    <span className="home-ph-who">
                      <b>Priya Sharma</b>
                      <span>priya@acme.in</span>
                    </span>
                    <ChevronDownIcon size={16} />
                  </div>
                  <Button fullWidth icon={FingerprintPatternIcon}>
                    {t.passkey}
                  </Button>
                  <Button fullWidth variant="ghost" tone="neutral">
                    {t.other}
                  </Button>
                  <p className="home-ph-foot">
                    <ShieldCheckIcon size={12} />
                    {t.protectedBy}
                  </p>
                </div>

                {/* The passkey sheet, over the dimmed page. */}
                <span className="home-ph-scrim" />
                <div className="home-ph-sheet">
                  <span className="home-ph-grabber" />
                  <span className="home-ph-ring">
                    <span className="home-swap" data-on={step === 5 ? "" : undefined}>
                      <ScanFaceIcon size={28} />
                      <Spinner size="lg" tone="brand" decorative />
                    </span>
                  </span>
                  <b>{t.sheetTitle}</b>
                  <span>{t.sheetBody}</span>
                  <Button fullWidth>{t.cont}</Button>
                  <Button fullWidth variant="ghost" tone="neutral">
                    {t.cancel}
                  </Button>
                </div>

                {/* Signed in: the session, at a glance. */}
                <div className="home-ph-done">
                  <span className="home-ph-ring home-ph-ring-ok">
                    <CircleCheckIcon size={28} />
                  </span>
                  <b>{t.done}</b>
                  <span>{t.doneSub}</span>
                  <dl className="home-ph-facts">
                    <div>
                      <dt>
                        <FingerprintPatternIcon size={14} />
                        {t.factPasskey}
                      </dt>
                      <dd>iPhone 16</dd>
                    </div>
                    <div>
                      <dt>
                        <ClockIcon size={14} />
                        {t.factSession}
                      </dt>
                      <dd>{t.session}</dd>
                    </div>
                    <div>
                      <dt>
                        <MapPinIcon size={14} />
                        {t.factPlace}
                      </dt>
                      <dd>{t.place}</dd>
                    </div>
                  </dl>
                  <Button fullWidth icon={Forward}>
                    {t.continueTo}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Qeet Notify: the notification that lands when the payment does. */}
          <div className="home-frag home-note" data-in={is(9)}>
            <span className="home-note-icon">
              <BellIcon size={16} />
            </span>
            <span className="home-note-text">
              <span className="home-note-app">Qeet Notify · {t.now}</span>
              <b>{t.toast}</b>
              <span>{t.toastBody(amount)}</span>
            </span>
          </div>

          {/* Qeet Logs: the same moments, as events. Machine text stays in English. */}
          <div
            className="home-frag home-logs"
            data-in={is(3)}
            data-qx-color-scheme="dark"
            lang="en"
          >
            <div className="home-logs-head">
              <b>Qeet Logs</b>
              <code>acme · production</code>
              <Badge tone="success" size="sm">
                Live
              </Badge>
            </div>
            <ol>
              <li data-in={is(6)}>
                <time>09:41:02</time>
                <code>auth.passkey.verified</code>
                <span>priya@acme.in</span>
              </li>
              <li data-in={is(8)}>
                <time>09:41:06</time>
                <code>payment.captured</code>
                <span>INV-2047 · ₹48,200.00</span>
              </li>
              <li data-in={is(9)}>
                <time>09:41:06</time>
                <code>notify.push.sent</code>
                <span>1 device</span>
              </li>
            </ol>
          </div>
        </div>
      </QeetrixProvider>

      <div className="home-story-bar">
        <ToggleGroup
          variant="segmented"
          size="sm"
          aria-label="Language of the preview"
          value={[lang]}
          onValueChange={(v) => v[0] && setLang(v[0] as Lang)}
        >
          <Toggle value="en">English</Toggle>
          <Toggle value="hi" lang="hi">
            हिन्दी
          </Toggle>
        </ToggleGroup>
        <span className="home-story-caption">
          Sign in, pay, notify, log: four products, one system.
        </span>
        {motion && (
          <Button size="sm" variant="ghost" tone="neutral" icon={RotateCcwIcon} onClick={play}>
            Replay
          </Button>
        )}
      </div>
    </div>
  );
}
