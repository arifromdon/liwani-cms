export default class Browser {
  static reload() {
    return window.location.reload()
  }

  static setWindowHref(href) {
    window.location.href = href
  }

  static getRootDomain(host = window.location.host) {
    const removePort = s => s.split(':')[0]
    const parts = host.split('.')
    const ipv4Regex = /^(\d{1,3}\.){3,3}\d{1,3}$/

    if (parts.length === 1) {
      return removePort(parts[0])
    }

    if (ipv4Regex.test(removePort(host))) {
      return removePort(host)
    }

    return removePort(parts.slice(parts.length - 2, parts.length).join('.'))
  }
}
