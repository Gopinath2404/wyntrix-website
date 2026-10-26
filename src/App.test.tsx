import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import App from './App'

describe('Wyntrix website', () => {
  it('renders the main sections and connects navigation to real section IDs', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1 }).textContent?.replace(/\s/g, '')).toBe('BUILDINGTOMORROWTOGETHER')
    expect(screen.getByRole('img', { name: 'Wyntrix logo' }).getAttribute('src')).toBe('/assets/wyntrix-logo.png')

    const navigation = screen.getByRole('navigation', { name: 'Main navigation' })
    const links = within(navigation).getAllByRole('link')
    expect(links).toHaveLength(7)
    for (const link of links) {
      const target = link.getAttribute('href')
      expect(target).toMatch(/^#[\w-]+$/)
      expect(target && document.getElementById(target.slice(1))).not.toBeNull()
    }

    for (const link of document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')) {
      const target = link.getAttribute('href')
      expect(target && document.getElementById(target.slice(1))).not.toBeNull()
    }

    expect(screen.getByRole('link', { name: /Explore Our Services/ }).getAttribute('href')).toBe('#services')
    expect(screen.getByRole('link', { name: /Join Our Community/ }).getAttribute('href')).toContain('chat.whatsapp.com')
    expect(screen.getByRole('link', { name: /Get in touch/ }).getAttribute('href')).toBe('#contact')
    expect(screen.getByRole('link', { name: 'Scroll to about Wyntrix' }).getAttribute('href')).toBe('#about')
    expect(screen.getByRole('link', { name: 'Meet the people behind it' }).getAttribute('href')).toBe('#team')
    expect(screen.getByRole('link', { name: /Let.s build together/ }).getAttribute('href')).toBe('#contact')
    expect(screen.getByRole('link', { name: 'Ask about opportunities' }).getAttribute('href')).toContain('mailto:wyntrixofficial@gmail.com')
    expect(screen.getByRole('link', { name: /Start a conversation/ }).getAttribute('href')).toContain('mailto:wyntrixofficial@gmail.com')
    expect(screen.getByRole('link', { name: 'Join our team' }).getAttribute('href')).toContain('mailto:wyntrixofficial@gmail.com')
  })

  it('opens and closes the mobile menu with navigation and Escape', async () => {
    const user = userEvent.setup()
    render(<App />)

    const toggle = screen.getByRole('button', { name: 'Open menu' })
    await user.click(toggle)
    expect(toggle.getAttribute('aria-expanded')).toBe('true')
    expect(toggle.getAttribute('aria-controls')).toBe('main-navigation')

    await user.keyboard('{Escape}')
    expect(screen.getByRole('button', { name: 'Open menu' }).getAttribute('aria-expanded')).toBe('false')
    expect(screen.getByRole('button', { name: 'Open menu' })).toBe(document.activeElement)

    await user.click(screen.getByRole('button', { name: 'Open menu' }))
    await user.click(within(screen.getByRole('navigation', { name: 'Main navigation' })).getByRole('link', { name: 'Services' }))
    expect(screen.getByRole('button', { name: 'Open menu' }).getAttribute('aria-expanded')).toBe('false')
    expect(window.location.hash).toBe('#services')
  })

  it('shows field-specific errors and associates them with invalid controls', () => {
    render(<App />)

    const form = screen.getByRole('button', { name: 'Prepare email draft' }).closest('form')
    expect(form).not.toBeNull()
    fireEvent.submit(form!)

    expect(screen.getByText('Choose an enquiry type.')).toBeTruthy()
    expect(screen.getByText('Enter your full name.')).toBeTruthy()
    expect(screen.getByText('Enter your email address.')).toBeTruthy()
    expect(screen.getByText('Enter a phone number.')).toBeTruthy()
    expect(screen.getByText('Enter a message.')).toBeTruthy()
    const emailField = document.querySelector<HTMLInputElement>('input[name="email"]')
    expect(emailField?.getAttribute('aria-invalid')).toBe('true')
    expect(emailField?.getAttribute('aria-describedby')).toBe('contact-email-error')
  })

  it('exposes semantic landmarks and accessible names for every control', () => {
    render(<App />)

    expect(screen.getAllByRole('main')).toHaveLength(1)
    expect(screen.getAllByRole('navigation')).toHaveLength(1)
    expect(screen.getAllByRole('contentinfo')).toHaveLength(1)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)

    for (const control of document.querySelectorAll('input, select, textarea')) {
      expect(control.closest('label')).not.toBeNull()
    }
    for (const button of screen.getAllByRole('button')) {
      expect(button.getAttribute('aria-label') || button.textContent?.trim()).toBeTruthy()
    }
    for (const link of screen.getAllByRole('link')) {
      expect(link.getAttribute('aria-label') || link.textContent?.trim() || link.querySelector('img[alt]')?.getAttribute('alt')).toBeTruthy()
    }
  })

  it('accepts valid international phone values and prepares an honest mailto fallback', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.selectOptions(screen.getByLabelText(/Enquiry type/), 'Collaboration')
    await user.type(screen.getByLabelText('Full name'), 'Alex Example')
    await user.type(screen.getByLabelText(/^Email/), 'alex@example.com')
    await user.type(screen.getByLabelText('Phone'), '+44 (20) 7946-0958')
    await user.type(screen.getByLabelText('Company / institution OPTIONAL'), 'Example College')
    await user.type(screen.getByLabelText('Message'), 'Let us discuss a collaboration.')
    await user.click(screen.getByRole('button', { name: 'Prepare email draft' }))

    const draft = screen.getByRole('link', { name: 'Open email draft' })
    expect(draft.getAttribute('href')).toContain('mailto:wyntrixofficial@gmail.com')
    expect(decodeURIComponent(draft.getAttribute('href')!)).toContain('Collaboration enquiry')
    expect(decodeURIComponent(draft.getAttribute('href')!)).toContain('+44 (20) 7946-0958')
    expect(screen.getByRole('status').textContent).toContain('this website has not sent or stored the message')
    expect(screen.getByRole('button', { name: 'Draft prepared' }).hasAttribute('disabled')).toBe(true)
  })

  it('rejects malformed email and phone values without creating a draft', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.selectOptions(screen.getByLabelText(/Enquiry type/), 'Services')
    await user.type(screen.getByLabelText('Full name'), 'Alex Example')
    await user.type(screen.getByLabelText('Email'), 'not-an-email')
    await user.type(screen.getByLabelText('Phone'), 'abc')
    await user.type(screen.getByLabelText('Message'), 'A question about services.')
    await user.click(screen.getByRole('button', { name: 'Prepare email draft' }))

    expect(screen.getByText('Enter a valid email address.')).toBeTruthy()
    expect(screen.getByText('Enter a valid phone number with 7–15 digits.')).toBeTruthy()
    expect(screen.queryByRole('link', { name: 'Open email draft' })).toBeNull()
  })

  it.each(['123456', '1234567890123456', '12-abc-34567'])(
    'rejects phone input outside the accepted format: %s',
    async (phone) => {
      const user = userEvent.setup()
      render(<App />)

      await user.selectOptions(screen.getByLabelText(/Enquiry type/), 'Services')
      await user.type(screen.getByLabelText('Full name'), 'Alex Example')
      await user.type(screen.getByLabelText('Email'), 'alex@example.com')
      await user.type(screen.getByLabelText('Phone'), phone)
      await user.type(screen.getByLabelText('Message'), 'A question about services.')
      await user.click(screen.getByRole('button', { name: 'Prepare email draft' }))

      expect(screen.getByText('Enter a valid phone number with 7–15 digits.')).toBeTruthy()
      expect(screen.queryByRole('link', { name: 'Open email draft' })).toBeNull()
    },
  )

  it('clears the draft and validation feedback when a submitted field changes', async () => {
    const user = userEvent.setup()
    render(<App />)

    const submit = screen.getByRole('button', { name: 'Prepare email draft' })
    fireEvent.submit(submit.closest('form')!)
    expect(screen.getByText('Enter your email address.')).toBeTruthy()

    await user.type(screen.getByLabelText(/^Email/), 'alex@example.com')
    expect(screen.queryByText('Enter your email address.')).toBeNull()
    expect(document.querySelector<HTMLInputElement>('input[name="email"]')?.getAttribute('aria-invalid')).toBe('false')

    await user.selectOptions(screen.getByLabelText(/Enquiry type/), 'Services')
    await user.type(screen.getByLabelText(/^Full name/), 'Alex Example')
    await user.type(screen.getByLabelText(/^Phone/), '1234567')
    await user.type(screen.getByLabelText(/^Message/), 'A question about services.')
    await user.click(submit)
    expect(screen.getByRole('link', { name: 'Open email draft' })).toBeTruthy()

    await user.type(screen.getByLabelText('Message'), ' More detail.')
    expect(screen.queryByRole('link', { name: 'Open email draft' })).toBeNull()
    expect(screen.queryByRole('status')).toBeNull()
  })

  it('encodes the complete enquiry in the email draft without claiming delivery', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.selectOptions(screen.getByLabelText(/Enquiry type/), 'Collaboration')
    await user.type(screen.getByLabelText('Full name'), 'Alex & Sam')
    await user.type(screen.getByLabelText('Email'), 'alex+team@example.com')
    await user.type(screen.getByLabelText('Phone'), '+44 207 946 0958')
    await user.type(screen.getByLabelText('Company / institution OPTIONAL'), 'R&D College')
    await user.type(screen.getByLabelText('Message'), 'Can we partner?')
    await user.click(screen.getByRole('button', { name: 'Prepare email draft' }))

    const href = screen.getByRole('link', { name: 'Open email draft' }).getAttribute('href')!
    const url = new URL(href)
    expect(url.protocol).toBe('mailto:')
    expect(url.pathname).toBe('wyntrixofficial@gmail.com')
    expect(url.searchParams.get('subject')).toBe('Collaboration enquiry')
    expect(url.searchParams.get('body')).toContain('Name: Alex & Sam')
    expect(url.searchParams.get('body')).toContain('Email: alex+team@example.com')
    expect(url.searchParams.get('body')).toContain('Company / institution: R&D College')
    expect(url.searchParams.get('body')).toContain('Can we partner?')
    expect(screen.getByRole('status').textContent).toMatch(/has not sent or stored/)
    expect(screen.getByRole('status').textContent).not.toMatch(/message sent/i)
  })

  it('uses the supplied logo in the animated background and verified contact links', () => {
    render(<App />)

    expect(document.querySelectorAll('.floating-logo')).toHaveLength(8)
    expect(document.querySelector('.floating-logo img')?.getAttribute('src')).toBe('/assets/wyntrix-logo.png')
    expect(screen.getByRole('link', { name: 'wyntrixofficial@gmail.com' }).getAttribute('href')).toBe('mailto:wyntrixofficial@gmail.com')
    expect(screen.getByRole('link', { name: '+91 6381635513' }).getAttribute('href')).toBe('tel:+916381635513')
  })
})
