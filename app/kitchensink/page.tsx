import React from "react";

export default function KitchenSinkPage() {
  return (
    <div className="wrapper">
      <div className="flow flow--lg">
        <header className="flow">
          <h1>Kitchen Sink</h1>
          <p>A showcase of all available components and styles.</p>
        </header>

        <section className="flow">
          <h2>Typography</h2>
          <div className="flow">
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <h5>Heading 5</h5>
            <h6>Heading 6</h6>
            <p>
              This is a paragraph with some <a href="#">link text</a> and{" "}
              <strong>bold text</strong>.
            </p>
            <p>
              Here's some <code>inline code</code> and a code block:
            </p>
            <pre>
              <code>function example() {`return "Hello, world!"`}</code>
            </pre>
          </div>
        </section>

        <section className="flow">
          <h2>Buttons</h2>
          <div className="cluster">
            <button className="button">Default Button</button>
            <button className="button" data-variant="primary">
              Primary Button
            </button>
            <button className="button" data-variant="outline">
              Outline Button
            </button>
          </div>
          <div className="cluster">
            <button className="button" data-size="small">
              Small Button
            </button>
            <button className="button">Default Size</button>
            <button className="button" data-size="large">
              Large Button
            </button>
          </div>
          <div className="cluster">
            <button className="button" disabled>
              Disabled Button
            </button>
          </div>
        </section>

        <section className="flow">
          <h2>Cards</h2>
          <div className="grid grid--2">
            <div className="card">
              <div className="card__header">
                <h3 className="card__title">Default Card</h3>
                <p className="card__subtitle">Card subtitle</p>
              </div>
              <div className="card__content">
                <p>
                  This is the card content with some text to show how it looks.
                </p>
              </div>
              <div className="card__footer">
                <button className="button" data-variant="primary">
                  Action
                </button>
              </div>
            </div>

            <div className="card" data-variant="elevated">
              <div className="card__header">
                <h3 className="card__title">Elevated Card</h3>
              </div>
              <div className="card__content">
                <p>This card has elevated styling with shadow.</p>
              </div>
            </div>

            <div className="card" data-variant="outlined">
              <div className="card__header">
                <h3 className="card__title">Outlined Card</h3>
              </div>
              <div className="card__content">
                <p>This card has outlined styling.</p>
              </div>
            </div>

            <div className="card" data-variant="ghost">
              <div className="card__header">
                <h3 className="card__title">Ghost Card</h3>
              </div>
              <div className="card__content">
                <p>This card has ghost styling (no border/background).</p>
              </div>
            </div>
          </div>
        </section>

        <section className="flow">
          <h2>Forms</h2>
          <form className="form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="form-input"
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="Enter your email"
              />
              <p className="form-help">
                We'll never share your email with anyone else.
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                id="message"
                className="form-textarea"
                placeholder="Enter your message"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <select id="country" className="form-select">
                <option>Choose a country</option>
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
              </select>
            </div>

            <button type="submit" className="button" data-variant="primary">
              Submit
            </button>
          </form>
        </section>

        <section className="flow">
          <h2>Layout Components</h2>

          <h3>Stack</h3>
          <div className="stack">
            <div className="card">Item 1</div>
            <div className="card">Item 2</div>
            <div className="card">Item 3</div>
          </div>

          <h3>Cluster</h3>
          <div className="cluster">
            <div className="card">Item 1</div>
            <div className="card">Item 2</div>
            <div className="card">Item 3</div>
          </div>

          <h3>Grid</h3>
          <div className="grid grid--3">
            <div className="card">Grid Item 1</div>
            <div className="card">Grid Item 2</div>
            <div className="card">Grid Item 3</div>
            <div className="card">Grid Item 4</div>
            <div className="card">Grid Item 5</div>
            <div className="card">Grid Item 6</div>
          </div>
        </section>

        <section className="flow">
          <h2>Spacing Utilities</h2>
          <div className="p-lg">
            <div className="mt-xl mb-lg">
              <p>
                This paragraph has margin-top-xl and margin-bottom-lg classes.
              </p>
            </div>
            <div className="pt-md pb-md">
              <p>
                This paragraph has padding-top-md and padding-bottom-md classes.
              </p>
            </div>
          </div>
        </section>

        <section className="flow">
          <h2>Text Utilities</h2>
          <div className="flow">
            <p className="text-xs">Extra small text</p>
            <p className="text-sm">Small text</p>
            <p className="text-base">Base text</p>
            <p className="text-lg">Large text</p>
            <p className="text-xl">Extra large text</p>
            <p className="text-2xl">2XL text</p>
            <p className="text-3xl">3XL text</p>
            <p className="text-4xl">4XL text</p>
          </div>

          <div className="flow">
            <p className="text-center">Centered text</p>
            <p className="text-left">Left aligned text</p>
            <p className="text-right">Right aligned text</p>
          </div>

          <div className="flow">
            <p className="font-normal">Normal weight</p>
            <p className="font-medium">Medium weight</p>
            <p className="font-semibold">Semibold weight</p>
            <p className="font-bold">Bold weight</p>
          </div>
        </section>
      </div>
    </div>
  );
}
