# 🐾 A Little Birthday Surprise for Vaishnavi 🎉

A personalized, mobile-first, interactive birthday surprise website made with HTML5, CSS3, and Vanilla JavaScript.

Designed with a cute pastel aesthetic, playful puppy animations, humorous interactive missions, a personalized birthday letter, and a digital treat voucher.

---

## 🎁 What's Inside

1. **Landing Screen**: Animated SVG puppy (wagging tail, wiggling ears, blinking eyes, party hat), floating sparkles & paw prints, and a mission launch button.
2. **Mission 1: Choose a Birthday Assistant**:
   - 🐶 **Dog**: *Chief Happiness Officer* ("Expert in tail-wagging. Wags away 97% of worries, 3% require snacks.")
   - 🐱 **Cat**: *Chief Nap Officer* ("Expert in ignoring deadlines. Recommends cancelling meetings & napping.")
   - 🐼 **Panda**: *Chief Snack Officer* ("Expert in snack inspections. Real priorities in life.")
3. **Mission 2: Important Birthday Notifications**:
   - 💼 *Office / Work stress*: Airplane mode activated.
   - 💇‍♀️ *Hair overthinking*: Brain granted a paid day off.
   - 🐾 *Dog department*: Declares recipient worthy of extra treats and zero drama.
4. **Mission 3: The Birthday Wish Ceremony 🎂🕯️**:
   - Interactive birthday cake with an animated flickering candle flame.
   - Close eyes, make a wish, and tap the candle to blow it out!
   - Flame blows out with realistic smoke puff animation, sparkle chime, and a shower of confetti before unlocking the letter.
5. **Final Mission: Personalized Birthday Letter 💌**:
   - Elegant stationery card styling with a wax seal stamp, decorative stars, and heartfelt personalized text.
6. **Digital Treat Voucher 🦴🍰**:
   - Official treat voucher for one dessert of choice with playful terms & conditions.
7. **Interactive "Pet the Puppy" Counter 🐶🐾**:
   - Tap the puppy on the landing screen to give headpats!
   - Triggers accelerated tail-wagging, floating hearts, and funny milestone badges (*"Puppy Whisperer"*).
8. **Cozy Music Box Synthesizer 🎵**:
   - Built-in Web Audio API music box that plays a gentle chime melody of *"Happy Birthday"* with an easy ON/OFF toggle in the top bar.
9. **Replay & Clean Reset**:
   - Replay button that cleanly resets the interactive state for another round.
   - Pure Vanilla JS canvas confetti bursts with automatic cleanup.

---

## 🚀 How to Run Locally

1. **Extract the ZIP file** to any folder on your computer.
2. Double-click **`index.html`** to open it directly in any modern browser (Google Chrome, Safari, Microsoft Edge, Firefox, Brave).
   - *Alternative (via command line)*: If you have Python installed, you can run:
     ```bash
     python -m http.server 8080
     ```
     and open `http://localhost:8080` in your browser.

---

## ✏️ How to Customize or Edit Content

All code is clean, modular, and well-commented:

- **Recipient Name & Letter Text**:
  - Open `index.html` in VS Code, Notepad, or any text editor.
  - Search for `Hey, Vaishnavi! 🎉` to change the greeting.
  - Search for `Happy Birthday, Vaishnavi! 🥳` to edit the letter body or signature.
- **Voucher Details**:
  - Look for the `<div class="voucher-card">` section in `index.html` to customize the dessert voucher text.
- **Colors & Styling**:
  - Open `style.css` and adjust the CSS variables under `:root` (`--bg-blush`, `--color-rose`, `--color-plum`, etc.).

---

## 🌐 How to Host Online for FREE with GitHub Pages

Hosting on GitHub Pages is 100% free and takes less than 3 minutes.

### Step 1: Create a Free GitHub Account & Repository
1. Go to [github.com](https://github.com/) and sign in (or sign up for free).
2. Click the **"+"** button at the top right and select **New repository**.
3. Name your repository (e.g., `birthday-surprise` or `for-vaishnavi`).
4. Keep the repository **Public** (required for free GitHub Pages).
5. Click **Create repository**.

### Step 2: Upload the Project Files
1. On the repository page, click **uploading an existing file**.
2. Drag and drop these 4 files into the upload box:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`
3. Click **Commit changes** at the bottom.

### Step 3: Enable GitHub Pages
1. In your repository, click the **Settings** tab (gear icon at the top).
2. In the left sidebar, click **Pages** (under "Code and automation").
3. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
4. Under **Branch**, select `main` (or `master`) and folder `/ (root)`.
5. Click **Save**.

### Step 4: Get Your Public Link
1. Wait 1 to 2 minutes for GitHub to build the site.
2. Refresh the Pages settings page. You will see a banner:
   > *"Your site is live at `https://<your-username>.github.io/<repository-name>/`"*
3. Copy that URL!

### Step 5: Test on Phone Before Sharing
1. Send the URL to yourself on WhatsApp or open it on Safari / Chrome on your phone.
2. Verify:
   - Smooth opening on mobile screen (no horizontal overflow).
   - Tapping on the assistant cards triggers the quote & checkmark.
   - Confetti bursts and sound effects work smoothly.
   - Letter and voucher display clearly.

---

## 💬 Suggested WhatsApp / DM Message to Send Her

Copy and send this accompanying message along with the link:

> “Ek chhota sa birthday surprise banaya hai tere liye 😂🎂 Open karna jab free ho, aur end tak dekhna 🐾”

---

## 🛠️ Troubleshooting Common Hosting Issues

- **404 Not Found error**:
  - Wait 2–3 minutes after saving GitHub Pages settings.
  - Make sure `index.html` is in the root directory (not tucked inside a subfolder).
- **Styles or Scripts not loading**:
  - Verify that `style.css` and `script.js` are in the same folder as `index.html`.
- **Sound doesn't play immediately**:
  - Browsers require a user interaction (tap or click) before playing audio. As soon as she taps "Start the birthday mission ✨", sound activates automatically!
- **Works offline**:
  - The website has zero external script dependencies or external audio files. The puppy and icons are pure SVG/emojis and the sounds use the Web Audio API.

---

*Made with care and good vibes 🐾*
