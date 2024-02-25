import { Link } from "react-router-dom"

export default function Button({ children, disabled, onClick, to, type, ...props}) {
  const base =  'text-sm focus:outline-none focus:ring-2 bg-yellow-400 hover:bg-yellow-300 focus:bg-yellow-300 disabled:bg-slate-400 rounded-full focus:ring-yellow-300 focus:ring-offset-2 font-semibold text-stone-800 uppercase tracking-wide transition-colors duration-300 disabled:cursor-not-allowed'

  const styles = {
    primary: base + ' px-4 py-2 ',
    round: base + ' px-2.5 py-2 md:px-3.5 md:py-2 text-sm',
    small: base + ' px-2 py-2 md:px-5 md:py-2 text-xsm',
    secondary: "text-sm focus:outline-none focus:ring-2 hover:bg-stone-300 border-2 px-4 py-1.5 border-stone-300 focus:bg-stone-300 disabled:bg-slate-400 rounded-full focus:ring-stone-200 focus:ring-offset-2 font-semibold text-stone-400 uppercase tracking-wide transition-colors duration-300 disabled:cursor-not-allowed hover:text-stone-800"
  }

  if (to) {
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    )
  }
  return (
    <button disabled={disabled} onClick={onClick} className={styles[type]} {...props}>
      {children}
    </button>
  )
}
