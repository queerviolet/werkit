module.exports =
  function compile(renderer=markdown) {
    return compileNode

    function compileNode(node) {
      const Renderer = renderer(node)
          , {children} = node
      
      if (typeof Renderer === 'function')
        return Renderer({...node, children: compileAll(children, compileNode)})
      
      return <Renderer>{compileAll(children, compileNode)}</Renderer>
    }
  }

const mergeConsecutive = {html: true, text: true}

const compileAll = (children=[], compiler=compile) =>
  children
    // The Markdown parser is really stupid about generating HTML tokens, so
    // embedded markdown comes across as multiple consecutive tokens.
    // Merge these.
    .reduce((children=[], child) => {
      const last = children[children.length - 1] || {}
      if (mergeConsecutive[child.type] && last.type === child.type) {
        return [...children.slice(0, -1), {...last, value: last.value + child.value}]
      }
      return [...children, child]
    }, [])
    .map((child, key) => React.cloneElement(compiler(child), {key, type: child.type}))
